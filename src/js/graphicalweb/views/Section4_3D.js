/*global define, TWEEN, _log, $ */

define(['graphicalweb/events/UserEvent',
        'graphicalweb/events/StateEvent',
        'graphicalweb/models/VarsModel',
        'graphicalweb/controllers/CameraController',
        'graphicalweb/controllers/AudioController',
        'graphicalweb/views/components/Char3d',
        'graphicalweb/views/components/Div'],

	function (UserEvent, StateEvent, VarsModel, Camera, Audio, Moon, Div) {
		
		var Section4_3D = function () {
			var instance = this,
                stateId = 4,
                $blockquotes,
                $cover,
                view;

            instance.phaselength = 0;
            instance.phase = 0;

//private

            function handle_animIn_COMPLETE() {
                StateEvent.SECTION_ANIM_IN_COMPLETE.dispatch(stateId);

                if (VarsModel.PRESENTATION === true) {
                    instance.next();
                }
            }

//public
            instance.init = function (direct) {
                view = '.section4';
                $blockquotes = $('blockquote' + view);
                               
                instance.phase = 0;
                instance.phaselength = $blockquotes.length;

                //character = new Character();
                StateEvent.SECTION_READY.dispatch(stateId);
            };

            instance.animIn = function (direct) {
                var goalPosition = {x: 810, y: 492, z: -6550},
                    goalRotation = {x: 1, y: -55, z: 0},
                    divPosition = {x: 4800, y: -1170, z: 4300},
                    divRotation = {x: 0, y: 50, z: 0};

                if (direct) {
                    Camera.setPosition(goalPosition);
                    Camera.setRotation(goalRotation);
                } else {
                    Camera.animateRotation(goalRotation, 1000);
                    Camera.animatePosition(goalPosition, 1000, {easing: TWEEN.Easing.Quadratic.EaseInOut});
                    
                    Div.animatePosition(divPosition, 2000, {easing: TWEEN.Easing.Sinusoidal.EaseIn});
                    Div.animateRotation(divRotation, 2000, {callback: handle_animIn_COMPLETE});
                }
            };

            instance.next = function () {
                var $currentQuote = $($blockquotes[instance.phase]);
                
                $blockquotes.fadeOut();

                switch (instance.phase) {
                case 0:
                    //mooned
                    Div.setFace('talk');                   
                    Audio.playDialogue($currentQuote.data('audio'), function () {
                        StateEvent.WAIT_FOR_INTERACTION.dispatch();
                        Div.setFace('happy');
                    });
                    break;
                case 1:
                    //z axis
                    StateEvent.AUTOMATING.dispatch();         
                    Div.setFace('happy');
                    Audio.playDialogue($currentQuote.data('audio'), function () {
                        UserEvent.NEXT.dispatch();
                    });
                    break;
                case 2:
                    //what does it all mean
                    Div.setFace('talk');
                    Audio.playDialogue($currentQuote.data('audio'), function () {
                        Div.setFace('happy');
                        UserEvent.NEXT.dispatch();
                    });
                    break;
                case 3:
                    //view things from every angle
                    Div.setFace('happy');
                    Moon.startRotation();
                    Audio.playDialogue($currentQuote.data('audio'), function () {
                        UserEvent.NEXT.dispatch();
                    });
                    break;
                case 4:
                    //hey i can see my house from  here                    
                    Div.setFace('talk');
                    Audio.playDialogue($currentQuote.data('audio'), function () {
                        UserEvent.NEXT.dispatch();
                        Moon.stopRotation();
                    });
                    break;
                case 5:
                    //dream big
                    Div.setFace('talk');
                    Moon.stopRotation();
                    Audio.playDialogue($currentQuote.data('audio'), function () {
                        Div.setFace('happy');
                        UserEvent.NEXT.dispatch();
                    });
                    break;
                }

                //$($blockquotes[instance.phase]).fadeIn();
                instance.phase += 1;
            };

            instance.stop = function () {
                $(view).hide();
                instance.destroy();
            };

            instance.destroy = function () {
                StateEvent.SECTION_DESTROY.dispatch();
            };
		};

		return new Section4_3D();
    });
