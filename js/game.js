/**
 * Created by Dylan on 04/10/2014.
 */

var canvas, context2d;
var game;

var blocs, planes;

var tabKeys = [];

var margin = 20;
var intervalGame;

function initializeGame() {
    var map = loadElements('mapTest', 'm');

    game = new GAME(0, 'Test', 'canvas', {width: 500, height: 500}, map);

    //blocs = loadElements('blocs', 'b');
    //planes = loadElements('planes', 'p');
}

function loadElements(fileName, endExtension) {
    var xhr = getXMLHttpRequest();

    xhr.open("GET", 'files/' + fileName + '.ds' + endExtension, false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger les éléments du fichier \"" + fileName + "\" (code HTTP : " + xhr.status + ").");

    return JSON.parse(xhr.responseText);
}

function startGame() {
    document.onkeydown = function(e) {
        var code = e.keyCode;

        if(tabKeys.indexOf(code) < 0)
        {
            tabKeys.push(code);
        }
    };

    document.onkeyup = function(e) {
        var code = e.keyCode;
        var index = tabKeys.indexOf(code);

        if(index >= 0)
        {
            tabKeys.splice(index, 1);
        }
    };

    intervalGame = setInterval(function() {
        for(var i = 0; i < tabKeys.length; i++)
        {
            switch(tabKeys[i]) {
                case 37 :
                    game.planes[0].movePlane(DIRECTION.LEFT, game.map);
                    break;
                case 39 :
                    game.planes[0].movePlane(DIRECTION.RIGHT, game.map);
                    break;
                case 38 :
                    game.planes[0].movePlane(DIRECTION.TOP, game.map);
                    break;
                case 40 :
                    game.planes[0].movePlane(DIRECTION.BOTTOM, game.map);
                    break;
                default :
                    console.log('notGameKey');
            }
        }

        if(margin == 20)
        {
            margin = 0;

            game.drawScene(true);
        }
        else
        {
            game.drawScene(false);
        }

        margin += 1;
    }, game.timeRefresh);
}

function getXMLHttpRequest()
{
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject)
    {
        if (window.ActiveXObject)
        {
            try
            {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e)
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        else
        {
            xhr = new XMLHttpRequest();
        }
    }
    else
    {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}

initializeGame();
