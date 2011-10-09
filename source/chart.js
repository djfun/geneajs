/*
  This file is part of djfun/familytree.
  djfun/familytree is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Foobar is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with djfun/familytree.  If not, see <http://www.gnu.org/licenses/>.
*/

ChartHelper = {
  render: function(inAncestors, inDepth) {
    var ancestors = {
      "0": [inAncestors]
    };
    for (var i = 1; i<= inDepth; i++) {
      var levelAncestors = [];
      for (var j = 0; j<ancestors[i-1].length; j++) {
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
    for (var i = inDepth; i>0; i--) {
      var inv_i = inDepth - i;
      for (var j = 0; j < ancestors[i].length; j++) {
        if (ancestors[i][j].type != "empty") {
          var len = Math.pow(2, inv_i - 1) * 110;
          var left = (inv_i == 0) ? 0 + j * 110:
            Math.pow(2, inv_i - 1) * 110 - 55 + Math.pow(2, inv_i) * 110 * j;
          data[data.length] = {left: left, top: -i * 140, data: ancestors[i][j].data};
          lines[lines.length] = {left: left + 50, top: -i * 140 + 102, data: {orientation: "vertical", len: 20}};
          if (j % 2 == 0) {
            lines[lines.length] = {left: left + 50, top: -i * 140 + 122, data: {orientation: "horizontal", len: len}};
          } else {
            lines[lines.length] = {left: left + 50 - len, top: -i * 140 + 122, data: {orientation: "horizontal", len: len}};
          }
          if (i != inDepth) {
            if (ancestors[i][j].father || ancestors[i][j].mother) {
              lines[lines.length] = {left: left + 50, top: -i * 140 - 18, data: {orientation: "vertical", len: 18}};
            }
          }
        }
      }
    }
    var pedigree = this.renderPedigree(inAncestors.pedigree);
    var ped_data = pedigree.data;
    var ped_lines = pedigree.lines;
    
    var left = Math.pow(2, inDepth - 1) * 110 - 55 + Math.pow(2, inDepth) * 110 * 0;
    for (var i = 0; i<ped_data.length; i++) {
      ped_data[i].left+= left;
      ped_data[i].top+= 0;
    }
    for (var i = 0; i<ped_lines.length; i++) {
      ped_lines[i].left+= left;
      ped_lines[i].top+= 0;
    }
    lines[lines.length] = {left: left + 50, top: -18, data: {orientation: "vertical", len: 18}};
    
    data = data.concat(ped_data);
    lines = lines.concat(ped_lines);
    
    var right_space = (110*pedigree.data[0].maxWidth)/2;
    // siblings1
    if (inAncestors.siblings1) {
      
      for (var j = 0; j<inAncestors.siblings1.length; j++) {
        
        var siblings1_ped = this.renderPedigree(inAncestors.siblings1[j]);
        var sib1_ped_data = siblings1_ped.data;
        var sib1_ped_lines = siblings1_ped.lines;
        var new_left = left - right_space - ((110*siblings1_ped.data[0].maxWidth)/2)
        for (var i = 0; i<sib1_ped_data.length; i++) {
          sib1_ped_data[i].left+= new_left;
          sib1_ped_data[i].top+= 0;
        }
        for (var i = 0; i<sib1_ped_lines.length; i++) {
          sib1_ped_lines[i].left+= new_left;
          sib1_ped_lines[i].top+= 0;
        }
        right_space+= 110*siblings1_ped.data[0].maxWidth;
        
        lines[lines.length] = {left: new_left + 50, top: -18, data: {orientation: "vertical", len: 18}};
        lines[lines.length] = {left: new_left + 50, top: -18, data: {orientation: "horizontal", len: left - (new_left + 50)}};
        
        data = data.concat(sib1_ped_data);
        lines = lines.concat(sib1_ped_lines);
      }
    }
    
    // father_siblings
    if (inAncestors.father_siblings) {
      var father_left = Math.pow(2, inDepth - 2) * 110 - 55 + Math.pow(2, inDepth - 1) * 110 * 0;
      right_space-=(left - father_left);
      if (right_space < 55) {
        right_space = 55;
      }
      for (var j = 0; j<inAncestors.father_siblings.length; j++) {
        var father_sib_ped = this.renderPedigree(inAncestors.father_siblings[j]);
        var father_sib_ped_data = father_sib_ped.data;
        var father_sib_ped_lines = father_sib_ped.lines;
        var new_left = father_left - right_space - ((110*father_sib_ped.data[0].maxWidth)/2);
        for (var i = 0; i<father_sib_ped_data.length; i++) {
          father_sib_ped_data[i].left+= new_left;
          father_sib_ped_data[i].top-= 140;
        }
        for (var i = 0; i<father_sib_ped_lines.length; i++) {
          father_sib_ped_lines[i].left+= new_left;
          father_sib_ped_lines[i].top-= 140;
        }
        right_space+= 110*father_sib_ped.data[0].maxWidth;
        
        lines[lines.length] = {left: new_left + 50, top: -18-140, data: {orientation: "vertical", len: 18}};
        lines[lines.length] = {left: new_left + 50, top: -18-140, data: {orientation: "horizontal", len: father_left - (new_left + 50)}};
        
        data = data.concat(father_sib_ped_data);
        lines = lines.concat(father_sib_ped_lines);
      }
    }
    
    // now the other side
    var left_space = (110*pedigree.data[0].maxWidth)/2;
    
    //siblings2
    if (inAncestors.siblings2) {
      
      for (var j = 0; j<inAncestors.siblings2.length; j++) {
        
        var siblings2_ped = this.renderPedigree(inAncestors.siblings2[j]);
        var sib2_ped_data = siblings2_ped.data;
        var sib2_ped_lines = siblings2_ped.lines;
        var new_left = left + left_space + ((110*siblings2_ped.data[0].maxWidth)/2)
        for (var i = 0; i<sib2_ped_data.length; i++) {
          sib2_ped_data[i].left+= new_left;
          sib2_ped_data[i].top+= 0;
        }
        for (var i = 0; i<sib2_ped_lines.length; i++) {
          sib2_ped_lines[i].left+= new_left;
          sib2_ped_lines[i].top+= 0;
        }
        left_space+= 110*siblings2_ped.data[0].maxWidth;
        
        lines[lines.length] = {left: new_left + 50, top: -18, data: {orientation: "vertical", len: 18}};
        lines[lines.length] = {left: left + 50, top: -18, data: {orientation: "horizontal", len: (new_left) - left}};
        
        data = data.concat(sib2_ped_data);
        lines = lines.concat(sib2_ped_lines);
      }
    }
    
    // mother_siblings
    if (inAncestors.mother_siblings) {
      var mother_left = Math.pow(2, inDepth - 2) * 110 - 55 + Math.pow(2, inDepth - 1) * 110 * 1;
      left_space-=(mother_left - left);
      if (left_space < 55) {
        left_space = 55;
      }
      for (var j = 0; j<inAncestors.mother_siblings.length; j++) {
        var mother_sib_ped = this.renderPedigree(inAncestors.mother_siblings[j]);
        var mother_sib_ped_data = mother_sib_ped.data;
        var mother_sib_ped_lines = mother_sib_ped.lines;
        var new_left = mother_left + left_space + ((110*mother_sib_ped.data[0].maxWidth)/2);
        for (var i = 0; i<mother_sib_ped_data.length; i++) {
          mother_sib_ped_data[i].left+= new_left;
          mother_sib_ped_data[i].top-= 140;
        }
        for (var i = 0; i<mother_sib_ped_lines.length; i++) {
          mother_sib_ped_lines[i].left+= new_left;
          mother_sib_ped_lines[i].top-= 140;
        }
        left_space+= 110*mother_sib_ped.data[0].maxWidth;
        
        lines[lines.length] = {left: new_left + 50, top: -18-140, data: {orientation: "vertical", len: 18}};
        lines[lines.length] = {left: mother_left + 50, top: -18-140, data: {orientation: "horizontal", len: new_left - mother_left}};
        
        data = data.concat(mother_sib_ped_data);
        lines = lines.concat(mother_sib_ped_lines);
      }
    }
    
    return this.draw(data, lines);
  },
  draw: function(inData, inLines) {
    var returnData = "";
    
    var d = this.normalize(inData, inLines);
    var data = d.data;
    var lines = d.lines;
    for (var i = 0; i<data.length; i++) {
      var value = data[i];
      returnData+="<div class='data_node' style='top:" + value.top + "px; left:" + value.left + "px;'>" + value.data.name + "</div>";
    }
    for (var i = 0; i<lines.length; i++) {
      var value = lines[i];
      var length_css = value.data.orientation == "horizontal" ? "width: " + value.data.len + "px" : "height: " + value.data.len + "px";
      returnData+="<div class='line' style='top:" + value.top + "px; left:" + value.left + "px; " + length_css + "'>&nbsp;</div>";
    }
    return returnData;
  },
  normalize: function(inData, inLines) {
    var mostNegativeLeft = 1000;
    var mostNegativeTop = 1000;
    var returnData = [];
    var returnLines = [];
    for (var i = 0; i<inData.length; i++) {
      var value = inData[i];
      if (value.left < mostNegativeLeft) {
        mostNegativeLeft = value.left;
      }
      if (value.top < mostNegativeTop) {
        mostNegativeTop = value.top;
      }
    }
    for (var i = 0; i<inData.length; i++) {
      var value = inData[i];
      returnData[i] = {
        left: value.left - mostNegativeLeft,
        top: value.top - mostNegativeTop,
        data: value.data
      };
    }
    for (var i = 0; i<inLines.length; i++) {
      var value = inLines[i];
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
      inElement.left+=(110*inElement.maxWidth)/2;
      data[data.length] = inElement;
    });
    
    this.preOrder(pedigree, function(inElement) {
      // and add lines
      if (inElement.children) {
        lines[lines.length] = {left: inElement.left + 50, top: inElement.top + 102, data: {orientation: "vertical", len: 20}};
        var children = inElement.children;
        for (var i = 0; i<children.length; i++) {
          var child = children[i];
          lines[lines.length] = {left: child.left + 50, top: child.top - 18, data: {orientation: "vertical", len: 18}};
          if (i == 0) {
            var left1 = child.left + 50;
            var top = child.top - 18;
          }
          if (i == children.length - 1) {
            var len = (child.left + 50) - left1;
          }
        }
        lines[lines.length] = {left: left1, top: top, data: {orientation: "horizontal", len: len}};
      }
    });
    
    var root_left = pedigree.left;
    var root_top = pedigree.top;
    
    for (var i = 0; i<data.length; i++) {
      data[i].left-= root_left;
      data[i].top-= root_top;
    }
    for (var i = 0; i<lines.length; i++) {
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
          inElement.left+=110*maxWidth;
          inElement.top+=140;
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