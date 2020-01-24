'use strict'

var numbers = [];

function Game() {
    var count = 0;
    var hits = 0;
    var wrong = 0;

    this.generate = function () {
        $('body>div').css("background-image", 'url(img/b' + Math.floor(Math.random() * 6) + '.jpg)');

        $('body>div').mousemove(function (e) {
            var height = 20 / $(window).height();
            var width = 40 / $(window).width();

            $('body>div').mousemove(function (e) {
                var move_x = width * (e.pageX - ($(window).width() / 2)) * -1 - 25;
                var move_y = height * (e.pageY - ($(window).height() / 2)) * -1 - 50;
                $('body>div').css("background-position", move_x + "px " + move_y + "px");
            });
        });
    };

    this.play = function () {
        $('body>div').html('<table></table>');

        for (var b = 0; b < 8; b++) {
            numbers.push(b);
            numbers.push(b);
        }
        numbers.sort(() => Math.random() - 0.5);

        for (var i = 0; i < 4; i++) {
            $('table').append('<tr></tr>');
            for (var j = 0; j < 4; j++) {
                $('tr:last-child').append('<td><img src=\"img/8.jpg\" alt="Wolf"></td>');
            }
        }

        $('td>img').click(function (index) {
            if ($(this).attr('class') != 'checked') {
                $(this).attr('src', 'img/' + numbers[$('img').index(this)] + '.jpg');
                count++;

                if (count >= 2) {
                    var num1 = $("td>img[src!='img/8.jpg'][class!='checked']").toArray()[0].getAttribute('src')[4];
                    var num2 = $("td>img[src!='img/8.jpg'][class!='checked']").toArray()[1].getAttribute('src')[4];
                    if (num1 == num2) {
                        $("td>img[src!='img/8.jpg'][class!='checked']").each(function () {
                            $(this).addClass("checked");
                        });
                    }

                    function hide() {
                        if ($("td>img[class!='checked']").length == 0) {
                            alert("Well done!");
                        } else {
                            $("td>img[class!='checked']").each(function () {
                                $(this).attr('src', 'img/8.jpg');
                            });
                        }
                    }
                    setTimeout(hide, 350);

                    count = 0;
                }
            }
        });
    };

    this.start = function () {
        $('body>div').html('<h1>Wolves</h1><img src="img/Play_b.png" alt="Start.">');

        this.generate();

        $('h1+img').on({
            mouseover: function () {
                $(this).attr('src', 'img/Play_y.png');
            },

            mouseout: function () {
                $(this).attr('src', 'img/Play_b.png');
            },

            click: this.play
        });
    };
}

$(function () {
    var play = new Game();
    play.start();
});
