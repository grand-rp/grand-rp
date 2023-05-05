(function () {
    let Menu = {
        navLinks: $('.header-nav-list a'),
        getCurrentPage: function () {
            let _ = this,
                locationPathname = window.location.pathname;

            $.each(_.navLinks, function () {
                let $this = $(this);
                if ($this.attr('href') === locationPathname) {
                    $this.parent().addClass('active').siblings().removeClass('active');
                }
            });
        },
        showMobileBav: function () {
            $('.header-nav-trigger').on('click', function (e) {
                e.preventDefault();
                $('.header-right').toggleClass('show-nav');
                $(this).toggleClass('show-nav');
            });
        },
        showUserMenu: function () {
            $('.header-toggle-menu').on('click', function (e) {
                e.preventDefault();
                $('.header-user').toggleClass('show-menu')
            });
        },
        init: function () {
            let _ = this;

            _.showUserMenu();
            _.showMobileBav();
            _.getCurrentPage();
        }
    };

    Menu.init();


    let notification = {
        notificationContainer: null,
        hideNotification: function () {
            let _ = this;

            $(_.notificationContainer).removeClass('show').addClass('hide');

            setTimeout(function () {
                _.notificationContainer.remove();
            }, 300);
        },
        showNotification: function () {
            let _ = this;
            setTimeout(function () {
                $(_.notificationContainer).removeClass('hide').addClass('show');
            }, 100);

            setTimeout(function () {
                _.hideNotification();
            }, 2000);
        },
        buildNotification: function (message) {
            let _ = this;
            _.notificationContainer = $('<div />').addClass('notification-container hide');
            let notificationMessageTemplate = `<span>${message}</span>`;
            let notificationItem = $('<div />').addClass('notification-item').html(notificationMessageTemplate);

            $(_.notificationContainer).appendTo($('body'));
            $(notificationItem).appendTo(_.notificationContainer);
        },
        success: function (message) {
            let _ = this;

            _.buildNotification(message);
            _.showNotification();
        }
    };

    let monitoring = {
        loadedData: null,
        copyToClipboard: function (serverIP) {
            let copyCommandSupported = document.queryCommandSupported('copy');

            if (copyCommandSupported === true) {
                let textareaTemplate = $('<textarea />').addClass('clipboard-container');
                $(textareaTemplate).val(serverIP).appendTo($('body'));
                $(textareaTemplate).select();

                try {
                    let successful = document.execCommand('copy');
                    let msg = successful ? 'IP-ul a fost copiat!' : 'IP-ul nu poate fi copiat!';

                    notification.success(msg);
                } catch (err) {
                    console.log('Eroare la copiere!');
                }
                $(textareaTemplate).remove();
            }
        },
        initListeners: function () {
            let _ = this;

            $('.copy-server-ip').on('click', function (e) {
                e.preventDefault();

                let serverIP = $(this).data('server-ip');
                _.copyToClipboard(serverIP);
            });
        },
        init: function () {
            let _ = this;

            _.initListeners();
        }
    };

    monitoring.init();

}());

const percentageWithMax = (num, per) => {
    let result = (num/100)*per;
    return result > 100 ? 100 : result;
}

function load_info() {
    const serverCode = "zqr7p4";
    const maxClients = 128;
    $(".start-to-play").attr("href", `fivem://connect/${serverCode}`)

    $.getJSON(`https://servers-frontend.fivem.net/api/servers/single/${serverCode}`, function (data) {
        const clientsData = data.Data || {clients: 0};

        $('.server_box_left_side span').html(clientsData.clients + `/${maxClients}`);
        $(".server_box_members_percent span").css("width", percentageWithMax(maxClients, clientsData.clients))
    }).fail(() => {
        $(".server_box_center_side p").text("Server Offline");
    });
}