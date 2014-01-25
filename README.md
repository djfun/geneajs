geneajs [![Build Status](https://travis-ci.org/djfun/geneajs.png?branch=master)](https://travis-ci.org/djfun/geneajs)
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
*  (multiple) spouses of descendants, siblings and the reference person

Todo
----
* functions for building familytree data structure
* functions to work with GEDCOM files (read, edit, write)
* more formatting and data for the person boxes
* compact tree ?
* zoom ?
* more tests

How can I use it?
-----------------
You do need a javascript object with the following elements:
* pedigree
* siblings1 (array, optional, siblings of reference person, displayed on the left)
* siblings2 (array, optional, siblings of reference person, displayed on the right)
* father_siblings (array, optional, siblings of the father of reference person, displayed on the left)
* mother_siblings (array, optional, siblings of the mother of reference person, displayed on the right)
* father (optional)
* mother (optional)

Inside these you put one (or many if it is an array) `data` object with all values you want to display in the tree (eg. name, birth, death). The `data` object in `pedigree` is the reference person. In all descending elements you can put a `spouses` array and inside that a `data` element for the spouse and a `children` array for the children. In the `father` and `mother` elements you can just define `father` and `mother` elements for their parents.
You can see an example in the examples folder, if that description was too complicated or if you just don't want to read long text.

To create html you can call

    ChartHelper.render(myTree, depth, template)

and you get back divs for the data boxes and the lines which connect them. You can specify a template for the content of the data boxes by putting a handlebars template string into the render method. If you don't use that parameter the template `"{{name}}"` is used.

Tests
-----
There are a few tests in the test folder. You can run them with

    nodeunit test

