'use strict';

/*
 * jcDraggable
 * Directive for dragging an element.
 * Parameters (optional): startposition(x, y), orientation(SE,NW, SW, NE)
 * orientation NW: from the top left
 * orientation NE: from the top right
 * orientation SW: from the bottom left
 * orientation SE: from the bottom right
 * Jan Croonen, 11-2014
 */
angular.module('jcDirectives', []).
        directive('jcDraggable', function ($document) {
            return {
                restrict: 'A',
                link: function (scope, elm, attr) {
                    var startX,
                            startY,
                            x = 0,
                            y = 0,
                            draggableParms = attr['jcDraggable'],
                            draggableObject = attr['jcDraggableObject'],
                            obj = elm,
                            orientation = 'NW';

                    if (draggableObject) {
                        obj = angular.element(draggableObject);
                    }
                    if (draggableParms) {
                        var parms = draggableParms.split(','),
                                css = {};

                        x = parms[0];
                        y = parms[1];
                        if (parms.length > 2) {
                            orientation = parms[2].trim();
                        }
                        switch (orientation) {
                            case 'NW':
                                obj.css('top', y + 'px');
                                obj.css('left', x + 'px');
                                break;
                            case 'NE':
                                obj.css('top', y + 'px');
                                obj.css('right', x + 'px');
                                break;
                            case 'SW':
                                obj.css('bottom', y + 'px');
                                obj.css('left', x + 'px');
                                break;
                            case 'SE':
                                obj.css('bottom', y + 'px');
                                obj.css('right', x + 'px');
                                break;
                            default:
                                throw 'jcDraggable: invalid orientation (NE,NW,SW,SE): '
                                        + orientation;
                        }
                    }
                    elm.css({cursor: 'move'});
                    obj.css({position:'fixed'});

                    elm.on('mousedown', function (event) {
                        // Prevent default dragging of selected content
                        event.preventDefault();
                        switch (orientation) {
                            case 'NW':
                                startX = event.screenX - x;
                                startY = event.screenY - y;
                                break;
                            case 'NE':
                                startX = - event.screenX - x;
                                startY = event.screenY - y;
                                break;
                            case 'SW':
                                startX = event.screenX - x;
                                startY = - event.screenY - y;
                                break;
                            case 'SE':
                                startX = - event.screenX - x;
                                startY = - event.screenY - y;
                                break;
                        }
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });

                    function mousemove(event) {
                        switch (orientation) {
                            case 'NW':
                                y = event.screenY - startY;
                                x = event.screenX - startX;
                                obj.css('top', y + 'px');
                                obj.css('left', x + 'px');
                                break;
                            case 'NE':
                                y = event.screenY - startY;
                                x = - event.screenX - startX;
                                obj.css('top', y + 'px');
                                obj.css('right', x + 'px');
                                break;
                            case 'SW':
                                y = - event.screenY - startY;
                                x = event.screenX - startX;
                                obj.css('bottom', y + 'px');
                                obj.css('left', x + 'px');
                                break;
                            case 'SE':
                                y = - event.screenY - startY;
                                x = - event.screenX - startX;
                                obj.css('bottom', y + 'px');
                                obj.css('right', x + 'px');
                                break;
                        }
                    }
                    function mouseup() {
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                    }
                }
            };
        });

