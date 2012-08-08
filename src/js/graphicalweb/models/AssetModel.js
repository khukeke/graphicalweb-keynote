/*global define PreloadJS SoundJS*/
define(['graphicalweb/events/StateEvent'],

	function (StateEvent) {
		
        //TODO rewrite to use preloadjs
        
		var AssetModel = function () {
			var instance = this,
                IMG_DIR = '../img/',
                AUDIO_DIR = '../audio/',
                DIALOGUE_LOADER,
                BG_LOOP_LOADER,
                INTRO_LOADER,
                CHARACTER_LOADER,
                UI_LOADER;

            instance.INTRO_IMAGES = [
                'intro/ground-shading.svg',
                'intro/cloud-1.svg',
                'intro/cloud-2.svg',
                'intro/bush-1.svg',
                'intro/grass.svg',
                'intro/tree-1.svg',
                'intro/tree-2.svg',
                'intro/tree-3.svg',
                'intro/tree-4.svg',
                'intro/tree-5.svg',
                'intro/tree-6.svg',
                'intro/tree-7.svg'
            ];

            instance.CHARACTER_IMAGES = [
                'character/div.png',
                'character/css.png',
                'character/char3d/bg.png',
                'character/char3d/face.png',
                'character/charSVG.svg',
                'character/ghost.svg'
            ];

            instance.UI_IMAGES = [
                'svg/info_icon.svg',
                'svg/icon_right.svg',
                'svg/circle.svg',
                'svg/circle_large.svg',
                'button/css.png',
                'button/svg.png',
                'button/transforms.png',
                'button/canvas.png',
                'button/webglBG.png',
                'button/webgl.png',
                'button/blend.png',
                'button/shader.png'
            ];

            instance.AUDIO_DIALOGUE = [
                '0001_yes',
                '0002_sorryboss',
                '0003_letsgo',
                '0004_hubbahubba',
                '0005_1996',
                '0006_css',
                '0007_mademebetter',
                '0008_lookingforsvg',
                '0009_nevergetoutofsystem',
                '0010_interestingshape',
                '0011_everyshape',
                '0012_arrgh',
                '0013_vectorgraphics',
                '0014_svg',
                '0015_puff',
                '0016_watchvectorvictor',
                '0017_moredimension',
                '0018_threedimension',
                '0019_yow',
                '0020_mooned',
                '0021_zaxis',
                '0022_whatdoesitallmean',
                '0023_everyangle',
                '0024_seemyhouse',
                '0025_granular',
                '0026_pixels',
                '0027_freaky',
                '0028_2dcanvas',
                '0029_spielberg',
                '0030_further',
                '0031_suckingsound',
                '0032_weird',
                '0033_webgliam',
                '0034_realworld',
                '0035_notry',
                '0036_amidead',
                '0037_dontbeafraid',
                '0038_takethat',
                '0039_whataboutdistortion',
                '0040_princessanother',
                '0041_welcomediv',
                '0042_whatisthis',
                '0043_pervertex',
                '0044_exploregraphical',
                '0045_thisiswhatimtalkingabout',
                '0046_letsgetcreative'
            ];

            instance.AUDIO_BG = [
                'theme_v1',     
                'space_v1'     
            ];

//private

            function loadDialogue() {
                var i,
                    name,
                    list = [];

                for (i = 0; i < instance.AUDIO_DIALOGUE.length; i += 1) {
                    name = instance.AUDIO_DIALOGUE[i];
                    list.push({id: name, src: AUDIO_DIR + 'dialogue/' + name + ".mp3|" + AUDIO_DIR + 'dialogue/' + name + ".ogg", type: "sound"});
                }

                DIALOGUE_LOADER = new PreloadJS();
                DIALOGUE_LOADER.installPlugin(SoundJS);
                DIALOGUE_LOADER.onFileLoad = function () {
                    
                };
                DIALOGUE_LOADER.onProgress = function () {
                    
                };
                DIALOGUE_LOADER.onComplete = function () {
                    
                };
                DIALOGUE_LOADER.loadManifest(list);
            }

            function loadLoops() {
                var i,
                    name,
                    list = [];
                
                for (i = 0; i < instance.AUDIO_LOOP.length; i += 1) {
                    name = instance.AUDIO_LOOP[i];
                    list.push({id: name, src: AUDIO_DIR + 'bg/' + name + ".mp3|" + AUDIO_DIR + 'bg/' + name + ".ogg", type: "sound"});
                }
                
                BG_LOOP_LOADER = new PreloadJS();
                BG_LOOP_LOADER.installPlugin(SoundJS);
                BG_LOOP_LOADER.onFileLoad = function (e) {
                
                };
                BG_LOOP_LOADER.onProgress = function () {
                    
                };
                BG_LOOP_LOADER.onComplete = function () {
                
                };
                BG_LOOP_LOADER.loadManifest(list);
            }
            
//public

            instance.loadIntro = function () {
                var i,
                    name,
                    list = [],
                    INTRO_AUDIO;

                for (i = 0; i < instance.INTRO_IMAGES.length; i += 1) {
                    name = instance.INTRO_IMAGES[i];
                    list.push({id: name, src: IMG_DIR + name, type: "image"});
                }

                list.push({id: instance.AUDIO_BG[0], src: AUDIO_DIR + 'bg/' + instance.AUDIO_BG[0] + ".mp3|" + AUDIO_DIR + 'bg/' + instance.AUDIO_BG[0] + ".ogg", type: "sound"});
                
                INTRO_LOADER = new PreloadJS();
                INTRO_LOADER.installPlugin(SoundJS);
                INTRO_LOADER.onFileLoad = function (e) {
                    _log('intro load:', e.id);
                };
                INTRO_LOADER.onProgress = function (e) {
                    
                };
                INTRO_LOADER.onComplete = function (e) {
                    StateEvent.INTRO_LOADED.dispatch();
                    instance.loadScene();
                };
                INTRO_LOADER.loadManifest(list);
            }

            instance.loadScene = function () {
                StateEvent.SCENE_LOADED.dispatch();
            }
        };

		return new AssetModel();
    });
