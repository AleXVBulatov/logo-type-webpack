import * as $ from "jquery";
import "slick-carousel";

import "./jquery.formstyler.min";
import "../../node_modules/jquery-form-styler/dist/jquery.formstyler.min";

$(".slider__inner, .news__slider").slick({
  infinite: false,
  nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
  prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',

  responsive: [
    {
      breakpoint: 768,
      settings: {
        autoplay: true,
        infinite: true,
        dots: true,
      },
    },
  ],
});

$("select").styler({});
