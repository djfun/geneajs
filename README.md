geneajs
================

A collection of javascripts to work with genealogical data and render a family tree/kinship chart.

What can it do?
---------------

It displays

*  the reference person
*  its siblings
*  all ancestors
*  the siblings of father and mother and their descendants
*  the descendants of the reference person
*  spouses of descendants and reference person

Todo
----
* functions for building familytree data structure
* functions to work with GEDCOM files (read, edit, write)
* more formatting and data for the person boxes
* compact tree ?
* zoom ?

How can I use it?
-----------------
You do need a data structure like the one in the example. Then you can call

    ChartHelper.render(myTree, depth)

to get html divs back that are the boxes and lines of the family tree.
But: Do not use this in production yet as there will be some changes to the structure of the project in the next weeks/days.