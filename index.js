function setCookie(cname, cvalue, exdays) {
    exdays = exdays || 3650;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=",
        ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
    }
    return "";
}
function delCookie(cname) {
    setCookie(cname, "", -1);
}

var meta_theme_color = {};
function retheme(theme) {
    var cn = document.body.className,
        allTheme = ("default,darktheme"/*allTheme*/).split(",");
    var now = 0;
    for (var i = 0; i < allTheme.length; ++i)
        if (cn.indexOf(allTheme[i]) > -1) {
            now = i;
            break;
        }
    document.body.className = cn.replace(allTheme[now], "").replace(/(\s)\1*/, "$1").trim();
    var nextTheme = theme || allTheme[(now + 1) % allTheme.length];
    if (nextTheme != "default")
        document.body.className = (cn + " " + nextTheme).trim();
    setCookie("theme", nextTheme);
    
    var meta = document.querySelector("meta[name=\"theme-color\"]");
    if (meta) meta.content = meta_theme_color[nextTheme];
}

window.addEventListener("load", function(e) {
    getThemeColor(document.styleSheets);
    function getThemeColor(sss) {
        for (var i = 0; i < sss.length; ++i) {
            var ss = sss[i], cr = ss.cssRules;
            if (!cr) continue;
            for (var j = 0; j < cr.length; ++j) {
                var csr = cr[j];
                if ("href" in csr) {
                    getThemeColor([csr.styleSheet]);
                    continue;
                }
                var st = csr.selectorText
                if (st && st.indexOf("meta-theme-color") > -1) {
                    var themeName = st.replace("meta-theme-color", "").trim();
                    if ((".#").indexOf(themeName.charAt(0)) > -1)
                        themeName = themeName.substring(1);
                    meta_theme_color[themeName] = csr.style.color;
                }
            }
        }
    }

    retheme(getCookie("theme") || "default");
});
