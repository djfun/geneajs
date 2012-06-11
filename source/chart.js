/*
  This file is part of djfun/familytree.
  djfun/familytree is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  djfun/familytree is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with djfun/familytree.  If not, see <http://www.gnu.org/licenses/>.
*/

ChartHelper = {
  height: 120,
  width: 120,
  render: function(inAncestors, inDepth) {

    var left;
    var returnObject;
    var data = [];
    var lines = [];

    returnObject = ChartHelper.renderAncestors(inAncestors, inDepth);
    data = data.concat(returnObject.data);
    lines = lines.concat(returnObject.lines);

    var pedigree = ChartHelper.renderPedigree(inAncestors.pedigree);
    var ped_data = pedigree.data;
    var ped_lines = pedigree.lines;
    var ped_right_offset = pedigree.right_offset;
    var ped_left_offset = pedigree.left_offset;
    
    // left value of element #1
    left = Math.pow(2, inDepth - 1) * (ChartHelper.width + 10) -
        (ChartHelper.width + 10) / 2;

    ped_data.forEach(function(dat, dat_ind, data) {
      dat.left+= left;
      dat.top+= 0;
    });

    ped_lines.forEach(function(line, line_ind, lines) {
      line.left+= left;
      line.top+= 0;
    });

    // line on top of element #1
    lines.push({
      left: left + (ChartHelper.width / 2),
      top: -18,
      data: {
        orientation: "vertical",
        len: 18
      }
    });
    
    data = data.concat(ped_data);
    lines = lines.concat(ped_lines);

    // space right of possible new elements to element #1
    var right_space = ped_left_offset + 10;
    
    // siblings1 (siblings left of element #1)
    if (inAncestors.siblings1) {
      
      returnObject = ChartHelper.renderPart(inAncestors.siblings1,
          left, 0, right_space, 'right');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
      right_space = returnObject.space;
    }
    
    // father_siblings (siblings of the father of element #1, they are left of father)
    if (inAncestors.father_siblings) {

      // left value of the father of element #1
      var father_left = Math.pow(2, inDepth - 2) * (ChartHelper.width + 10) -
        (ChartHelper.width + 10) / 2;
      right_space-=(left - father_left);
      if (right_space < 10) {
        right_space = 10;
      }
      returnObject = ChartHelper.renderPart(inAncestors.father_siblings,
          father_left, -(ChartHelper.height + 40), right_space, 'right');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
      right_space = returnObject.space;

    }
    
    // now the other side
    // we start with the same space here
    var left_space = ped_right_offset + 10;
    
    //siblings2 (siblings on the right)
    if (inAncestors.siblings2) {
      returnObject = ChartHelper.renderPart(inAncestors.siblings2,
          left, 0, left_space, 'left');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
      left_space = returnObject.space;
    }
    
    // mother_siblings
    if (inAncestors.mother_siblings) {
      // left value of the mother of element #1
      var mother_left = Math.pow(2, inDepth - 2) * (ChartHelper.width + 10) -
        (ChartHelper.width + 10) / 2 +
        Math.pow(2, inDepth - 1) * (ChartHelper.width + 10);
      left_space-=(mother_left - left);
      if (left_space < (ChartHelper.width + 10)) {
        left_space = ChartHelper.width + 10;
      }
      returnObject = ChartHelper.renderPart(inAncestors.mother_siblings,
          mother_left, -(ChartHelper.height + 40), left_space, 'left');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
    }
    
    return ChartHelper.draw(data, lines);
  },
  renderAncestors: function(inAncestors, inDepth) {
    var ancestors = new Array(inDepth);
    ancestors[0] = [inAncestors];

    ancestors.forEach(function(arr, arr_ind, ancestors) {
      var levelAncestors = [];
      arr.forEach(function(ancestor, ancestor_ind, acestors) {
        if (ancestor.father) {
          levelAncestors.push(ancestor.father);
        } else {
          levelAncestors.push({type: "empty"});
        }
        if (ancestor.mother) {
          levelAncestors.push(ancestor.mother);
        } else {
          levelAncestors.push({type: "empty"});
        }
      });
      ancestors[arr_ind + 1] = levelAncestors;
    });
      
    
    var data = [];
    var lines = [];

    ancestors.reverse();
    ancestors.pop();
    ancestors.forEach(function(arr, arr_ind, ancestors) {
      var i = inDepth - arr_ind;
      arr.forEach(function(ancestor, ancestor_ind, ancestors) {
        if (ancestor.type !== "empty") {
          var len = Math.pow(2, arr_ind - 1) * (ChartHelper.width + 10);
          left = (arr_ind === 0) ? 0 + ancestor_ind * (ChartHelper.width + 10) :
            Math.pow(2, arr_ind - 1) * (ChartHelper.width + 10) -
            ((ChartHelper.width + 10) / 2) +
            Math.pow(2, arr_ind) * (ChartHelper.width + 10) * ancestor_ind;
          
          data.push({
            left: left,
            top: -i * (ChartHelper.height + 40),
            data: ancestor.data
          });
          lines.push({
            left: left + (ChartHelper.width / 2),
            top: -i * (ChartHelper.height + 40) + (ChartHelper.height + 2),
            data: {
              orientation: "vertical",
              len: 20
            }
          });
          if (ancestor_ind % 2 === 0) {
            lines.push({
              left: left + (ChartHelper.width / 2),
              top: -i * (ChartHelper.height + 40) + (ChartHelper.height + 22),
              data: {
                orientation: "horizontal",
                len: len
              }
            });
          } else {
            lines.push({
              left: left + (ChartHelper.width / 2) - len,
              top: -i * (ChartHelper.height + 40) + (ChartHelper.height + 22),
              data: {
                orientation: "horizontal",
                len: len
              }
            });
          }
          if (i !== inDepth) {
            if (ancestor.father || ancestor.mother) {
              lines.push({
                left: left + (ChartHelper.width / 2),
                top: -i * (ChartHelper.height + 40) - 18,
                data: {
                  orientation: "vertical", len: 18
                }
              });
            }
          }
        }
      });
    });
    return {data: data, lines: lines};
  },
  renderPart: function(inElements, inLeft, inTop, inSpace, direction) {
    var return_data = [];
    var return_lines = [];
    inElements.forEach(function(element, element_ind, elements) {
      var ped = ChartHelper.renderPedigree(element);
      var ped_data = ped.data;
      var ped_lines = ped.lines;
      var ped_left_offset = ped.left_offset;
      var ped_right_offset = ped.right_offset;
      if (direction === 'left') {
        new_left = inLeft + inSpace +
            ped_left_offset;
      } else if (direction === 'right') {
        new_left = inLeft - inSpace -
            ped_right_offset;
      }
      ped_data.forEach(function(dat, dat_ind, data) {
        dat.left+= new_left;
        dat.top+= inTop;
      });

      ped_lines.forEach(function(line, line_ind, lines) {
        line.left+= new_left;
        line.top+= inTop;
      });
      inSpace+= (ChartHelper.width + 10) * ped.data[0].maxWidth;

      var len = direction === 'left' ? new_left - inLeft : inLeft - new_left;
      var hor_line_left = direction === 'left' ?
          inLeft + (ChartHelper.width / 2) :
          new_left + (ChartHelper.width / 2);
      
      ped_lines.push({
        left: new_left + (ChartHelper.width / 2),
        top: -18 + inTop,
        data: {
          orientation: "vertical",
          len: 18
        }
      });
      ped_lines.push({
        left: hor_line_left,
        top: -18 + inTop,
        data: {
          orientation: "horizontal",
          len: len
        }
      });
      
      return_data = return_data.concat(ped_data);
      return_lines = return_lines.concat(ped_lines);
    });

    return {data: return_data, lines: return_lines, space: inSpace};
  },
  draw: function(inData, inLines) {
    var returnData = "";
    
    var d = ChartHelper.normalize(inData, inLines);
    var data = d.data;
    var lines = d.lines;

    data.forEach(function(dat, dat_ind, data) {
      var gender = dat.data.gender ? dat.data.gender : 'unknown';
      returnData+="<div class='data_node gender_" + gender + "' style='top:" + dat.top + "px; left:" + dat.left + "px;'>" + dat.data.name + "</div>";
    });

    lines.forEach(function(line, line_ind, lines) {
      var length_css = line.data.orientation === "horizontal" ? "width: " + line.data.len + "px" : "height: " + line.data.len + "px";
      returnData+="<div class='line' style='top:" + line.top + "px; left:" + line.left + "px; " + length_css + "'>&nbsp;</div>";
    });
    return returnData;
  },
  normalize: function(inData, inLines) {
    var mostNegativeLeft = Math.min.apply(Math, inData.map(function(dat) {
      return dat.left;
    }));
    var mostNegativeTop = Math.min.apply(Math, inData.map(function(dat) {
      return dat.top;
    }));

    var returnData = inData.map(function(dat) {
      return {
        left: dat.left - mostNegativeLeft,
        top: dat.top - mostNegativeTop,
        data: dat.data
      };
    });
    var returnLines = inLines.map(function(line) {
      return {
        left: line.left - mostNegativeLeft,
        top: line.top - mostNegativeTop,
        data: line.data
      };
    });
    console.log("mostnegative: " + mostNegativeLeft);
    return {data: returnData, lines: returnLines};
  },
  renderPedigree: function(inPedigree) {
    
    var pedigree = ChartHelper.preparePedigree(inPedigree);

    var data = [];
    var lines = [];
    var left_offset = 0;
    var right_offset = 0;
    
    ChartHelper.preOrder(pedigree, function(inElement) {
      // center the element
      inElement.left+=((ChartHelper.width + 10)*inElement.maxWidth)/2;
      data.push(inElement);
    });

    var spouses_data = [];

    data.forEach(function(dat, dat_ind, data) {
      if (dat.spouses) {
        if (dat.spouses.length === 1) {
          dat.spouses[0].top = dat.top;
          dat.spouses[0].left = dat.left + ((ChartHelper.width + 10) / 2);
          dat.left = dat.spouses[0].left - (ChartHelper.width + 10);
          spouses_data.push(dat.spouses[0]);
          var width = 0;
            if (dat.spouses[0].children) {
              dat.spouses[0].children.forEach(function(child, child_ind, children) {
                width+=child.maxWidth;
              });
            } else {
              width = 1;
            }
            width = Math.max(2, width);
            dat.spouses[0].width = width;
        } else {
          dat.left-=((ChartHelper.width + 10) * dat.maxWidth)/2;
          var width00 = 0;
          dat.spouses.forEach(function(spouse, spouse_ind, spouses) {
            spouse.top = dat.top;
            var width = 0;
            if (spouse.children) {
              spouse.children.forEach(function(child, child_ind, children) {
                width+=child.maxWidth;
              });
            } else {
              width = 1;
              if (spouse_ind === 0) {
                width = 2;
              }
            }
            spouse.width = width;
            spouse.left = dat.left +
                (ChartHelper.width + 10) * ((width / 2) + width00);
            width00+=width;

            spouses_data.push(spouse);
          });

          dat.spouses[0].left+= ((ChartHelper.width + 10) / 2);
          dat.left = dat.spouses[0].left - (ChartHelper.width + 10);
          dat.width00 = width00;
        }
      }
    });
    if (inPedigree.spouses) {
      if (inPedigree.spouses.length === 1) {
        left_offset = (data[0].spouses[0].width * (ChartHelper.width + 10) / 2 - 5) -
            (ChartHelper.width + 5);
            console.log(data[0].spouses[0].width);
        right_offset = (data[0].spouses[0].width * (ChartHelper.width + 10) / 2 - 5) +
            (ChartHelper.width + 5);
        console.log("Fall 1");
      } else {
        left_offset = (data[0].spouses[0].width * (ChartHelper.width + 10) / 2 - 5) -
            (ChartHelper.width + 5);
        right_offset = data[0].width00 * (ChartHelper.width + 10) - 10 - left_offset;
        console.log("Fall 2");
      }
    } else {
      right_offset = ChartHelper.width;
      left_offset = 0;
      console.log("Fall 3");
    }
    console.log(data[0].data.name);
    console.log(left_offset);
    console.log(right_offset);
    data = data.concat(spouses_data);

    var left1;
    var top;
    var len;
    
    ChartHelper.preOrder(pedigree, function(inElement) {
      // and add lines

      if (inElement.spouses) {
        inElement.spouses.forEach(function(spouse, spouse_ind, spouses) {
          if (spouse.children) {
            lines.push({
              left: inElement.left + (ChartHelper.width / 2),
              top: inElement.top + ChartHelper.height + 2,
              data: {
                orientation: "vertical",
                len: 20
              }
            });

            lines.push({
              left: spouse.left + (ChartHelper.width / 2),
              top: spouse.top + ChartHelper.height + 2,
              data: {
                orientation: "vertical",
                len: 20
              }
            });
            spouse.children.forEach(function(child, child_ind, children) {
              lines.push({
                left: child.left + (ChartHelper.width / 2),
                top: child.top - 18,
                data: {
                  orientation: "vertical",
                  len: 18
                }
              });
              if (child_ind === 0) {
                left1 = child.left + (ChartHelper.width / 2);
                top = child.top - 18;
              }
              if (child_ind === children.length - 1) {
                len = (child.left + (ChartHelper.width / 2)) - left1;
              }
            });
            lines.push({
              left: left1,
              top: top,
              data: {
                orientation: "horizontal",
                len: len
              }
            });

            if (spouse.children.length === 1 && spouse_ind === 0) {
              lines.push({
                left: left1,
                top: top,
                data: {
                  orientation: "horizontal",
                  len: ChartHelper.width + 10
                }
              });
            }
          }
        });
      }
    });
    
    var root_left = pedigree.left;
    var root_top = pedigree.top;

    data.forEach(function(dat, dat_ind, data){
      dat.left-= root_left;
      dat.top-= root_top;
    });
    lines.forEach(function(line, line_ind, lines){
      line.left-= root_left;
      line.top-= root_top;
    });

    return {
      data: data,
      lines: lines,
      left_offset: left_offset,
      right_offset: right_offset
    };
  },
  preparePedigree: function(inPedigree) {
    var maxWidth = 0;
    var returnSpouses = [];

    var moveElement = function (inElement) {
      inElement.left+= (ChartHelper.width + 10) * maxWidth;
      inElement.top+= ChartHelper.height + 40;
    };

    if (!inPedigree.spouses) {
      return {left: 0, top: 0, maxWidth: 1, data: inPedigree.data};
    } else {
      inPedigree.spouses.forEach(function(spouse, spouse_ind, spouses) {
        if (!spouse.children) {
          maxWidth+= 1;
          if (spouse_ind === 0) {
            maxWidth+= 1;
          }
          returnSpouses[returnSpouses.length] = {
            data: spouse.data
          };
        } else {
          var returnChildren = [];
          spouse.children.forEach(function(child, child_ind, children) {
            returnChildren.push(ChartHelper.preparePedigree(child));

            var currentChild = returnChildren[returnChildren.length - 1];
            ChartHelper.preOrder(currentChild, moveElement);

            maxWidth+= currentChild.maxWidth;
            if (spouse_ind === 0 &&
                spouse.children.length === 1 &&
                currentChild.maxWidth === 1) {
              maxWidth+= 1;
            }
          });

          returnSpouses.push({
            data: spouse.data,
            children: returnChildren
          });
        }
      });
      return {
        left: 0,
        top: 0,
        maxWidth: maxWidth,
        data: inPedigree.data,
        spouses: returnSpouses
      };
    }
  },
  preOrder: function(inTree, inCallback) {
    inCallback(inTree);
    if (inTree.spouses) {
      inTree.spouses.forEach(function(spouse, spouse_ind, spouses) {
        if (spouse.children) {
          spouse.children.forEach(function(child, child_ind, children) {
            ChartHelper.preOrder(child, inCallback);
          });
        }
      });
    }
  }
};