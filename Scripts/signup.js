(function onPageReady() {
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {

                function GetParameterValues(param) {
                    var url = document.referrer.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0].toUpperCase() == param.toUpperCase()) {
                            return urlparam[1];
                        }

                    }
                    return null;
                };

                var continuteButton = document.getElementById('continue');
                if (continuteButton && $("#continue").is(':visible')) {

                    var Idvalues = $("#form_ids").val();
                    var formIds = Idvalues.split(",");
                    for (var index in formIds) {
                        var fieldClass = "." + formIds[index] + "_li";
                        $(fieldClass).show();
                    }

                    if ($("#customCancel") && $("#customCancel").is(':visible')) {
                        $("#customCancel").remove();
                    }
                    if ($("#customContinue") && $("#customContinue").is(':visible')) {
                        $("#customContinue").remove();
                    }

                    $("#continue").after("<button id='customCancel'>Cancel</button>");

                    $("#continue").after("<button id='customContinue'>Continue</button>");
                    $("#continue").hide();
                    $("#btnConsent").click(function () {

                        var portalURL = $("#passwordResetPortalUserURl").val();

                        if (portalURL != null && portalURL != undefined)
                            window.location.replace(portalURL);
                    });

                    $("#customContinue").click(function () {
                        console.log("customCancel clicked");
                        if ($("#speciality_required") && $("#speciality_required").is(':visible')) {
                            $("#speciality_value").val($("#speciality_required").val());
                        }
                        else {
                            $("#speciality_required").get(0).selectedIndex = 1;
                            $("#speciality_value").val($("#speciality").val());
                        }
                        $("#continue").click();

                    });
                    $("#customCancel").click(function () {
                        debugger;

                        var returnUrl = GetParameterValues('return_url'); //Encoded value FE URL
                        if (returnUrl == null)
                            returnUrl = "";
                        var redirectURI = GetParameterValues('redirect_uri');
                        var url = decodeURIComponent(redirectURI) + "#error=access_denied&error_description=AAD_Custom_466:" + returnUrl;
                        window.location.replace(url);


                    });
                    clearInterval(intervalHandle);
                }
            }
        }, 50);
}());