(function onPageReady() {
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0].toUpperCase() == param.toUpperCase()) {
                            return urlparam[1];
                        }

                    }
                    return null;
                };

               
                function loadFields() {

                    var fieldInfo = $.parseJSON($("#FieldInfo").val());
                    fieldInfo.Fields_Info.forEach(function (UXField) {
                        var fieldAttr = "." + UXField.Id + "_li";
                        var requiredFieldAttr = "." + UXField.Id + "_required_li";
                        var requiredFieldId = "#" + UXField.Id + "_required";
                        console.log(requiredFieldAttr);
                        if (UXField.Is_Visible) {
                            if (UXField.Is_Req && $(requiredFieldAttr) != null && $(requiredFieldAttr) != undefined && $(requiredFieldAttr).length > 0) {
                                $(fieldAttr).hide();
                                $(requiredFieldAttr).show();
                            }
                            else {
                                $(fieldAttr).show();
                                if ($(requiredFieldAttr).length > 0) {
                                    $(requiredFieldAttr).hide();
                                    if (UXField.InputType == "Dropdown") {
                                        //if dropdwon set default index 1
                                        $(requiredFieldId).get(0).selectedIndex = 1;
                                    }
                                    else {
                                        $(requiredFieldId).val("na");
                                    }
                                }
                            }
                        }
                        else {
                            $(fieldAttr).hide();
                            if ($(requiredFieldAttr).length > 0) {
                                $(requiredFieldAttr).hide();
                                if (UXField.InputType == "Dropdown") {
                                    //if dropdwon set default index 1
                                    $(requiredFieldId).get(0).selectedIndex = 1;
                                }
                                else {
                                    $(requiredFieldId).val("na");
                                }
                            }
                        }
                    });
                }
                function setFieldValues() {
                    var fieldInfo = $.parseJSON($("#FieldInfo").val());
                    fieldInfo.Fields_Info.forEach(function (UXField) {
                        if (UXField.Is_Visible) {
                            var fieldAttr = "#" + UXField.Id;
                            var requiredFieldAttr = "#" + UXField.Id + "_required";
                           
                            if (UXField.Is_Req &&  $(requiredFieldAttr).is(':visible')) {
                                $(fieldAttr).val($(requiredFieldAttr).val());
                            } 
                            else {
                                if ($(requiredFieldAttr).length > 0) {
                                    if (UXField.InputType == "Dropdown") {
                                        //if dropdwon set default index 1
                                        $(requiredFieldAttr).get(0).selectedIndex = 1;
                                    }
                                    else {
                                        $(requiredFieldAttr).val("na");
                                    }
                                }
                            }
                        }
                    });
                }
                function setUIElements() {
                    if ($("#customCancel") && $("#customCancel").is(':visible')) {
                        $("#customCancel").remove();
                    }

                    $("#continue").after("<button id='customCancel'>Cancel</button>");
                }
                function AttachCancelEvent() {
                    $("#customCancel").click(function (e) {
                        var returnUrl = GetParameterValues('return_url'); //Encoded value FE URL
                        if (returnUrl == null)
                            returnUrl = "";
                        var redirectURI = GetParameterValues('redirect_uri');
                        var url = decodeURIComponent(redirectURI) + "#error=access_denied&error_description=AAD_Custom_466:" + returnUrl;
                        window.location.replace(url);
                        e.stopPropagation();
                    });
                }
                function SetConsentCheckBoxesValue() {
                    var consentCheckBoxes = $(".attrEntry :checkbox");

                    if (consentCheckBoxes != null && consentCheckBoxes.length > 0) {

                        for (var item in consentCheckBoxes) {
                            if (consentCheckBoxes[item].checked) {
                                consentCheckBoxes[item].value = "true";
                            }
                            else {
                                consentCheckBoxes[item].value = "false";
                            }
                        }
                    }
                }
                var continuteButton = document.getElementById('continue');
                if (continuteButton && $("#continue").is(':visible')) {

                    loadFields();
                    setUIElements();
                    AttachCancelEvent();

                    $("#continue").click(function (e) {
                        setFieldValues();
                        SetConsentCheckBoxesValue();
                    });
                    clearInterval(intervalHandle);
                }
            }
        }, 50);
}());