/**
 * Created by interdate on 18/01/2018.
 */
(function($) {
    $("#newsletter_popup, .newsletter_success, .newsletter_error").hide();

    $(window).load(function(){
        $("#newsletter_popup").css({ "height" : $("#newsletter_popup").outerHeight(true) });

        if ( !($.cookie("newsletter_popup_status")) && $(window).width() > 768 ) {

            setTimeout(function(){
                $.fancybox(
                    $('#newsletter_popup'),
                    {
                        // 'width': 740,
                        // 'height': 580,
                        // 'autoSize' : false,
                        // 'openSpeed': 800,
                        // 'closeSpeed': 400,
                        helpers:  {
                            overlay: {
                                speedOut: 1000,
                            }
                        },
                        tpl: {
                            wrap: '<div id="newsletter_popup__wrap" class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                            closeBtn : '<a title="Close" id="newsletter_popup__close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                        },
                    }
                );

                $("#newsletter_popup__wrap").parent().on("click", function() {
                    $.cookie("newsletter_popup_status", "delayed");
                });

                $("#newsletter_popup__close").on("click", function() {
                    $.cookie("newsletter_popup_status", "delayed");
                });

                $("#newsletter_off").click(function () {
                    $.fancybox.close($('#newsletter_popup'));
                    $.cookie("newsletter_popup_status", "disabled", { expires : 365 });
                    return false;
                });

            }, 1500);

            // native Shopify form submition with AJAX
            $(".newsletter_form__shopify form").submit(function() {
                if ( $("#contact_email").val().length > 6 && $("#contact_email").val().indexOf("@") != -1 && $("#contact_email").val().indexOf(".") != -1 ) {
                    $.ajax({
                        type: "POST",
                        url: "/contact",
                        data: $("#newsletter_popup form").serialize(),
                        success: function(data)
                        {
                            $(".newsletter_form__shopify form").fadeOut(400);
                            $(".newsletter_success").delay(600).fadeIn();

                            setTimeout(function(){
                                $.fancybox.close($('#newsletter_popup'));
                            },2000);

                            $.cookie("newsletter_popup_status", "disabled", { expires : 365 });
                        }
                    });
                }

                else {
                    $("#contact_email").css({"border-color":"#f00"});
                    $(".newsletter_error").fadeIn(400);
                };

                return false;
            });

            // mailchimp form submition
            $("#mc-embedded-subscribe-form").submit(function() {
                $.cookie("newsletter_popup_status", "disabled", { expires : 365 });
            });

        };

    });
})(jQuery);