/*
  This file is part of djfun/familytree.
  djfun/familytree is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Foobar is distributed in the hope that it will be useful,
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
    var ancestors = {
      "0": [inAncestors]
    };
    var i;
    var j;
    var left;
    var new_left;
    for (i = 1; i<= inDepth; i++) {
      var levelAncestors = [];
      for (j = 0; j<ancestors[i-1].length; j++) {
        if (ancestors[i-1][j].father) {
          levelAncestors[levelAncestors.length] = ancestors[i-1][j].father;
        } else {
          levelAncestors[levelAncestors.length] = {type: "empty"};
        }
        if (ancestors[i-1][j].mother) {
          levelAncestors[levelAncestors.length] = ancestors[i-1][j].mother;
        } else {
          levelAncestors[levelAncestors.length] = {type: "empty"};
        }
      }
      ancestors[i] = levelAncestors;
    }
    
    var data = [];
    var lines = [];
    var returnObject;
    for (i = inDepth; i>0; i--) {
      var inv_i = inDepth - i;
      for (j = 0; j < ancestors[i].length; j++) {
        if (ancestors[i][j].type !== "empty") {
          var len = Math.pow(2, inv_i - 1) * (ChartHelper.width + 10);
          left = (inv_i === 0) ? 0 + j * (ChartHelper.width + 10):
            Math.pow(2, inv_i - 1) * (ChartHelper.width + 10) - ((ChartHelper.width + 10) / 2) + Math.pow(2, inv_i) * (ChartHelper.width + 10) * j;
          data[data.length] = {left: left, top: -i * (ChartHelper.height + 40), data: ancestors[i][j].data};
          lines[lines.length] = {left: left + (ChartHelper.width / 2), top: -i * (ChartHelper.height + 40) + (ChartHelper.height + 2), data: {orientation: "vertical", len: 20}};
          if (j % 2 === 0) {
            lines[lines.length] = {left: left + (ChartHelper.width / 2), top: -i * (ChartHelper.height + 40) + (ChartHelper.height + 22), data: {orientation: "horizontal", len: len}};
          } else {
            lines[lines.length] = {left: left + (ChartHelper.width / 2) - len, top: -i * (ChartHelper.height + 40) + (ChartHelper.height + 22), data: {orientation: "horizontal", len: len}};
          }
          if (i !== inDepth) {
            if (ancestors[i][j].father || ancestors[i][j].mother) {
              lines[lines.length] = {left: left + (ChartHelper.width / 2), top: -i * (ChartHelper.height + 40) - 18, data: {orientation: "vertical", len: 18}};
            }
          }
        }
      }
    }
    var pedigree = this.renderPedigree(inAncestors.pedigree);
    var ped_data = pedigree.data;
    var ped_lines = pedigree.lines;
    
    left = Math.pow(2, inDepth - 1) * (ChartHelper.width + 10) - ((ChartHelper.width + 10) / 2) + Math.pow(2, inDepth) * (ChartHelper.width + 10) * 0;
    for (i = 0; i<ped_data.length; i++) {
      ped_data[i].left+= left;
      ped_data[i].top+= 0;
    }
    for (i = 0; i<ped_lines.length; i++) {
      ped_lines[i].left+= left;
      ped_lines[i].top+= 0;
    }
    lines[lines.length] = {left: left + (ChartHelper.width / 2), top: -18, data: {orientation: "vertical", len: 18}};
    
    data = data.concat(ped_data);
    lines = lines.concat(ped_lines);


    var right_space = ((ChartHelper.width + 10)*pedigree.data[0].maxWidth)/2;
    // siblings1
    if (inAncestors.siblings1) {
      
      returnObject = this.renderPart(inAncestors.father_siblings, left, 0, right_space, 'right');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
      right_space = returnObject.space;
    }
    
    // father_siblings
    if (inAncestors.father_siblings) {
      var father_left = Math.pow(2, inDepth - 2) * (ChartHelper.width + 10) - ((ChartHelper.width + 10) / 2) + Math.pow(2, inDepth - 1) * (ChartHelper.width + 10) * 0;
      right_space-=(left - father_left);
      if (right_space < ((ChartHelper.width + 10) / 2)) {
        right_space = (ChartHelper.width + 10) / 2;
      }
      returnObject = this.renderPart(inAncestors.father_siblings, father_left, -(ChartHelper.height + 40), right_space, 'right');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
      right_space = returnObject.space;

    }
    
    // now the other side
    var left_space = ((ChartHelper.width + 10)*pedigree.data[0].maxWidth)/2;
    
    //siblings2
    if (inAncestors.siblings2) {
      returnObject = this.renderPart(inAncestors.siblings2, left, 0, left_space, 'left');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
      left_space = returnObject.space;
    }
    
    // mother_siblings
    if (inAncestors.mother_siblings) {
      var mother_left = Math.pow(2, inDepth - 2) * (ChartHelper.width + 10) - ((ChartHelper.width + 10) / 2) + Math.pow(2, inDepth - 1) * (ChartHelper.width + 10) * 1;
      left_space-=(mother_left - left);
      if (left_space < ((ChartHelper.width + 10) / 2)) {
        left_space = (ChartHelper.width + 10) / 2;
      }
      returnObject = this.renderPart(inAncestors.mother_siblings, mother_left, -(ChartHelper.height + 40), left_space, 'left');

      data = data.concat(returnObject.data);
      lines = lines.concat(returnObject.lines);
    }
    
    return this.draw(data, lines);
  },
  renderPart: function(inElements, inLeft, inTop, inSpace, direction) {
    var return_data = [];
    var return_lines = [];
    for (j = 0; j<inElements.length; j++) {
      var ped = this.renderPedigree(inElements[j]);
      var ped_data = ped.data;
      var ped_lines = ped.lines;
      if (direction === 'left') {
        new_left = inLeft + inSpace + (((ChartHelper.width + 10) * ped.data[0].maxWidth) / 2);
      } else if (direction === 'right') {
        new_left = inLeft - inSpace - (((ChartHelper.width + 10) * ped.data[0].maxWidth) / 2);
      }
      for (i = 0; i<ped_data.length; i++) {
        ped_data[i].left+= new_left;
        ped_data[i].top+= inTop;
        console.log(ped_data[i]);
      }
      for (i = 0; i<ped_lines.length; i++) {
        ped_lines[i].left+= new_left;
        ped_lines[i].top+= inTop;
      }
      inSpace+= (ChartHelper.width + 10)*ped.data[0].maxWidth;

      var len = direction === 'left' ? new_left - inLeft : inLeft - new_left;
      var hor_line_left = direction === 'left' ? inLeft + (ChartHelper.width / 2) : new_left + (ChartHelper.width / 2);
      
      ped_lines[ped_lines.length] = {left: new_left + (ChartHelper.width / 2), top: -18+inTop, data: {orientation: "vertical", len: 18}};
      ped_lines[ped_lines.length] = {left: hor_line_left, top: -18+inTop, data: {orientation: "horizontal", len: len}};
      
      return_data = return_data.concat(ped_data);
      return_lines = return_lines.concat(ped_lines);

    }
    return {data: return_data, lines: return_lines, space: inSpace};
  },
  draw: function(inData, inLines) {
    var returnData = "";
    
    var d = this.normalize(inData, inLines);
    var data = d.data;
    var lines = d.lines;
    var value;
    for (var i = 0; i<data.length; i++) {
      value = data[i];
      returnData+="<div class='data_node' style='top:" + value.top + "px; left:" + value.left + "px;'>" + value.data.name + "</div>";
    }
    for (i = 0; i<lines.length; i++) {
      value = lines[i];
      var length_css = value.data.orientation === "horizontal" ? "width: " + value.data.len + "px" : "height: " + value.data.len + "px";
      returnData+="<div class='line' style='top:" + value.top + "px; left:" + value.left + "px; " + length_css + "'>&nbsp;</div>";
    }
    return returnData;
  },
  normalize: function(inData, inLines) {
    var mostNegativeLeft = 1000;
    var mostNegativeTop = 1000;
    var returnData = [];
    var returnLines = [];
    var value;
    for (var i = 0; i<inData.length; i++) {
      value = inData[i];
      if (value.left < mostNegativeLeft) {
        mostNegativeLeft = value.left;
      }
      if (value.top < mostNegativeTop) {
        mostNegativeTop = value.top;
      }
    }
    for (i = 0; i<inData.length; i++) {
      value = inData[i];
      returnData[i] = {
        left: value.left - mostNegativeLeft,
        top: value.top - mostNegativeTop,
        data: value.data
      };
    }
    for (i = 0; i<inLines.length; i++) {
      value = inLines[i];
      returnLines[i] = {
        left: value.left - mostNegativeLeft,
        top: value.top - mostNegativeTop,
        data: value.data
      };
    }
    return {data: returnData, lines: returnLines};
  },
  renderPedigree: function(inPedigree) {
    
    var pedigree = this.preparePedigree(inPedigree);
    
    var data = [];
    var lines = [];
    
    this.preOrder(pedigree, function(inElement) {
      // center the element
      inElement.left+=((ChartHelper.width + 10)*inElement.maxWidth)/2;
      data[data.length] = inElement;
    });

    var left1;
    var top;
    var len;
    
    this.preOrder(pedigree, function(inElement) {
      // and add lines
      if (inElement.children) {
        lines[lines.length] = {left: inElement.left + (ChartHelper.width / 2), top: inElement.top + ChartHelper.height + 2, data: {orientation: "vertical", len: 20}};
        var children = inElement.children;
        for (var i = 0; i<children.length; i++) {
          var child = children[i];
          lines[lines.length] = {left: child.left + (ChartHelper.width / 2), top: child.top - 18, data: {orientation: "vertical", len: 18}};
          if (i === 0) {
            left1 = child.left + (ChartHelper.width / 2);
            top = child.top - 18;
          }
          if (i === children.length - 1) {
            len = (child.left + (ChartHelper.width / 2)) - left1;
          }
        }
        lines[lines.length] = {left: left1, top: top, data: {orientation: "horizontal", len: len}};
      }
    });
    
    var root_left = pedigree.left;
    var root_top = pedigree.top;

    var i;

    for (i = 0; i<data.length; i++) {
      data[i].left-= root_left;
      data[i].top-= root_top;
    }
    for (i = 0; i<lines.length; i++) {
      lines[i].left-= root_left;
      lines[i].top-= root_top;
    }
    
    return {data: data, lines: lines};
  },
  preparePedigree: function(inPedigree) {
    if (inPedigree.children) {
      var children = [];
      var maxWidth = 0;
      for (var i = 0; i<inPedigree.children.length; i++) {
        children[children.length] = this.preparePedigree(inPedigree.children[i]);
        
        var currentChild = children[children.length -1];
        
        this.preOrder(currentChild, function(inElement) {
          inElement.left+= (ChartHelper.width + 10) * maxWidth;
          inElement.top+= ChartHelper.height + 40;
        });
        
        maxWidth+= currentChild.maxWidth;
      }
      return {left: 0, top: 0, maxWidth: maxWidth, data: inPedigree.data, children: children};
    } else {
      return {left: 0, top: 0, maxWidth: 1, data: inPedigree.data};
    }
  },
  preOrder: function(inTree, inCallback) {
    inCallback(inTree);
    if (inTree.children) {
      for (var i = 0; i<inTree.children.length; i++) {
        this.preOrder(inTree.children[i], inCallback);
      }
    }
  }
};