// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // debugger
    hasRowConflictAt: function(rowIndex) {
       //debugger

      var row = this.attributes[rowIndex];

      var filteredRow = row.filter(function (value) {
          //console.log('return array of 1s');
          return value === 1;

        });
        //console.log(filteredRow);
        if (filteredRow.length > 1) {
          //console.log('conflict found');
          return true;
        } 
    //console.log('conflict not found');

    return false; 
    },
    // var newBoard = makeEmptyMatrix();
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
// debugger
    // console.log(this.attributes);
      //console.log(window.Board)
      for (var i = 0; i < this.attributes.n; i++){
        if (this.hasRowConflictAt(i) === true) {
          return true
        }
      }
      return false
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      var column = [];
      for (var i = 0; i < this.attributes.n; i++) {
         column.push(this.attributes[i][colIndex]);
      };
       var filteredColumn = column.filter(function (value) {
          //console.log('return array of 1s');
          return value === 1;

        });
        //console.log(filteredCol);
        if (filteredColumn.length > 1) {
          //console.log('conflict found');
          return true;
        } 
    //console.log('conflict not found');

    return false; 
    

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++){
        if (this.hasColConflictAt(i) === true) {
          return true
        }
      }
      return false


    //   //debugger
    //   //for each row push each item at index[blank] into its own array titled coloumn

    //   //make this into a conversion function
    //   var columnBasedMatrix = []
      
    //   for (var i = 0; i < 4; i++){
    //     var row = this.attributes[i];

    //     var columnArray = []
    //     for (var j = 0; j < 4; j++){
    //         columnArray.push(this.attributes[i][j])
    //     }
    //     //console.log(columnArray);
    //     columnBasedMatrix.push(columnArray.slice());

    //   }
    //   //console.log(columnBasedMatrix);
    //   //end of conversion function
 
    //   //debugger
    //   for (var i = 0; i < 4; i++){
    //     var column = columnBasedMatrix[i];
        
    //     var filteredColumn = column.filter(function (value) {
    //       //console.log('return array of 1s');
    //       return value === 1;

    //     });
    //     //console.log(filteredRow);
    //     if (filteredColumn.length > 1) {
    //       //console.log('conflict found');
    //       return false;
    //     }
    //   } 
    // //onsole.log('conflict not found');

    // return true; 
return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(colNum) {
        //debugger
        var rowNum = 0;
        var table = this.attributes;
      //with index provided
        var size = table.n;
      var diagonalLine = [];
      
      var recurse = function (colNum, rowNum){
          if(colNum < size && rowNum < size){
          diagonalLine.push(table[rowNum][colNum])
              recurse(colNum + 1, rowNum + 1);            
              console.log(diagonalLine);   
          }        
      }
      recurse(colNum,rowNum);
      var filteredDiag = diagonalLine.filter(function (value) {
        return value === 1;
      })
      if (filteredDiag.length > 1) {
        return true;
      };

      return false; // fixme
    },
      //we can increment row by 1 and increment column by 1 to find the diagonal patterns
        //if column[0].. then diagonal will be next row column[1]
        
        //this.attributes[startPoint + 1][majorDiagonalColumnIndexAtFirstRow + 1];

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) {
          return true;
        }
      };
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
