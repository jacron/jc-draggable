jc-draggable
============
jcDraggable is a directive for dragging objects in angular.

##usage-example

    <div jc-draggable="0, 10, SE" jc-draggable-object=".dialog"></div>

optional parameters jc-draggable : x, y, orientation[SE,SW,NW,NE]

optional attribute jc-draggable-object: jQuery / angular.element selector

##explanation
A jc-draggable object can be anchored to left-top (NW), right-top (NE), bottom-left (SW) or bottom-right (SE).
