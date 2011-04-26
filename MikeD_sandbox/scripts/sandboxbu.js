//========================================================
// Get text
//========================================================
function getText() {
    return $('#tarText').val();
}
function setText(sText) {
    return $('#tarText').val(sText);
}

//========================================================
// String utility
//========================================================
function indentLength(sLine) {
    var match = sLine.match(/^(\s*)/);
    if (match === null) {
        return 0
    }
    return match[1].length;
}
function minIndentLength(sLines) {
    var lines = sLines.split('\n');
    var min;
    $.each(lines, function(i, each) {
        var length = indentLength(each);
        if (!min || length < min) {
            min = length;
        }
    });
    return min;
}

//========================================================
// Multi-line String functions
//========================================================
function replaceCr(sLines, sReplacement) {
    var result = sLines.replace(/\n/g, sReplacement);
    return "'" + result + "'";
}
function mainLines(sLines) {
    var length = minIndentLength(sLines);
    var lines = sLines.split('\n');
    var trimmed = lines.map(function(each) {
        return each.slice(length);
    });
    var notSpaceStart = /^\S/;
    var noSpace = trimmed.filter(function(each) {
        return notSpaceStart.test(each);
    });
    var alphaStart = /^\w/;
    var alpha = noSpace.filter(function(each) {
        return alphaStart.test(each);
    });
    var result = alpha.join('\n');
    return result;
}
function arrayOfLines(sLines) {
    var lines = sLines.split('\n');
    var result = '[';
    lines.forEach(function(each, i) {
        if (i !== 0) {
            result += ",";
        }
        result += "\n    '" + each + "'"
    });
    result += '\n]';
    return result;
}

//========================================================
// Evaluate lines
//========================================================
function spaces(i) {
    var result = '';
    while (result.length < i) {
        result += ' ';
    }
    return result;
}
function upToResult(sLine) {
    var index = sLine.search(/\/\/=>/);
    return (index > -1) ? sLine.slice(0, index) : sLine;
}
function evaluateLines(sLines) {
    var max = 0, code = '', display = '';
    var lines = sLines.split('\n').map(function(each) {
        return upToResult(each).trimRight();
    });
    lines = lines.filter(function(each) {
        return each.length > 0;
    });
    lines.forEach(function(each) {
        max = Math.max(max, each.length);
    });
    lines.forEach(function(each, i) {
        var pad = max + 2 - each.length;
        code += each + '\n';
        if (i > 0) {
            display += '\n';
        }
        display += each;
        try {
            var result = eval(code);
            if (result !== undefined) {
                display += spaces(pad) + '//=> ' + result;
            }
        } catch (error) {
        }
    });
    return display;
}

//========================================================
// AJAX
//========================================================
//
// See http://api.jquery.com/jQuery.getJSON/
//
function showAjaxResult(sUrl) {
    function handleResponse(oData, sTextStatus, oJqXHR) {
        sTextStatus = sTextStatus || 'NO TEXTSTATUS';
        var ajaxResult = {
            oData: oData,
            sStatus: sTextStatus
        };
        var printResult = jsDump.parse(ajaxResult);
        setText(printResult);
    }
    function handleError(oData, sTextStatus, oJqXHR) {
        sTextStatus = sTextStatus || 'NO TEXTSTATUS';
        var ajaxResult = {
            oData: oData,
            sStatus: sTextStatus
        };
        var printResult = jsDump.parse(ajaxResult);
        setText(printResult);
    }
    $.ajax({
        url: sUrl,
        success: handleResponse,
        error: handleError
    });
}
function showAjaxResult2(sUrl) {
    function handleResponse(oData, sTextStatus, oJqXHR) {
        sTextStatus = sTextStatus || 'NO TEXTSTATUS';
        var ajaxResult = {
            oData: oData,
            sStatus: sTextStatus
        };
        var printResult = jsDump.parse(ajaxResult);
        setText(printResult);
    }
    $.getJSON(sUrl, handleResponse);
}

//========================================================
// Attach code to buttons
//========================================================
function bindButtons() {
    $('#btnEvaluateLines').click(function() {
        var result = evaluateLines(getText());
        setText(result);
    });

    $('#btnBreakString').click(function() {
        var result = replaceCr(getText(), '\\n');
        setText(result);
    });

    $('#btnBreakStringPlus').click(function() {
        var result = replaceCr(getText(), "\\n' +\n'");
        setText(result);
    });

    $('#btnPrettyPrint').click(function() {
        //must put parentheses around the text before eval to handle objects
        var evalResult = eval('(' + getText() + ')');
        var printResult = jsDump.parse(evalResult);
        setText(printResult);
    });

    $('#btnStackOverflow').click(function() {
        showAjaxResult('http://api.stackoverflow.com/1.0/stats');
    });

    $('#btnStackOverflow2').click(function() {
        showAjaxResult2('http://api.stackoverflow.com/1.0/stats?jsonp=?');
    });

    $('#btnStackOverflowStan').click(function() {
        showAjaxResult2('http://stackoverflow.com/users/flair/346711.json?callback=?');
    });
    

}


