import React from "react";
import { useInView } from "react-intersection-observer";
import SectionIndicator from "../common/SectionIndicator";

const MissionIcon = ({ className }: { className?: string }) => (
  <svg
    id="Vector"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1200"
    className={className}
  >
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `.cls-1{fill:#f8f8f8;}.cls-2,.cls-7{fill:none;}.cls-2{stroke:#efefef;stroke-linecap:round;stroke-linejoin:round;stroke-width:5px;}.cls-3{fill:#efefef;}.cls-4{fill:#56cad8;}.cls-5{fill:#74d5de;}.cls-6{fill:#fd8369;}.cls-7{stroke:#fd8369;stroke-miterlimit:10;stroke-width:9px;}.cls-8{fill:#de8e68;}.cls-9{fill:#f9c87a;}.cls-10{fill:#fed385;}.cls-11{fill:#d37c59;}.cls-12{fill:#fed892;}`,
        }}
      />
    </defs>
    <rect className="cls-1" x="181.21" y="128" width="553.1" height="553.1" />
    <polyline
      className="cls-2"
      points="523.96 185.42 523.96 339.63 621.1 339.63"
    />
    <ellipse className="cls-3" cx="735.11" cy="944.85" rx="292.89" ry="55.69" />
    <polyline points="841.88 919.32 841.88 939.03 903.26 939.03 903.26 930.31 864.16 919.32" />
    <polyline points="589.09 914.57 589.09 924.62 595.48 931.63 611.13 931.63 617.12 940.85 576.77 940.85 561.56 916.28 571.39 903" />
    <path
      className="cls-4"
      d="M791.56,617.51s75.52,113,82.1,137.43-9.5,164.38-9.5,164.38H841.88S825.07,818.5,829.82,783.06C813,772.84,740,726.43,734.11,702.51"
    />
    <path
      className="cls-5"
      d="M791.56,617.51c-7,17.24-73.88,156.79-73.88,156.79L589.09,914.57l-19-12.42L657,766,674.9,604.73"
    />
    <rect
      className="cls-6"
      x="496.76"
      y="674.35"
      width="178.59"
      height="95.36"
    />
    <circle className="cls-7" cx="586.05" cy="675.29" r="27.07" />
    <path
      className="cls-8"
      d="M837.31,483.6c2,4.23,8.05,34,7.85,50.88,10.25,5.43,69,53.4,76.21,57.31,10.49,5.7,14,5.7,14.88,6.36-1.86,3.33-10.78,18.24-10.78,18.24s-8.52-7.59-12.64-9.19-63.63-29.68-95.18-55c-5.42-4.35-12.11-19.7-12.51-24.1s1.06-39.8,1.06-39.8Z"
    />
    <path
      className="cls-8"
      d="M663.47,468.41c-3.06,3.68-43.62,44.94-54.39,68S594.72,587.2,591,600c-4.86,16.55-17.19,35.9-17.19,46.47,0,5.67,6.61,14.54,11.33,14.54s16.65-.78,19.26-17.94c4.08-26.78,21.53-69.49,28.7-78.36s65-69.87,67.42-74.21S673.47,456.32,663.47,468.41Z"
    />
    <path
      className="cls-9"
      d="M784.63,412.26c19.53-7.25,63.18,64.55,55.83,71.4s-49.7,23.22-57.33,17.22S764,419.91,784.63,412.26Z"
    />
    <path
      className="cls-10"
      d="M764.79,398.86C852,408.7,802.39,581,791.56,617.51c-19,8.59-109.27,5.2-116.66-12.78C672,582.08,683.79,393.05,764.79,398.86Z"
    />
    <path
      className="cls-11"
      d="M780.36,416.25c0,5.25-26.36,5.53-26.36,0V377.43h26.36Z"
    />
    <path
      className="cls-8"
      d="M775.77,302.24c-16.19,0-29.31,20.54-29.31,45.88,0,1.38,0,2.73.12,4.08a5.72,5.72,0,0,0,1.51,11c4,17.94,14.87,30.81,27.68,30.81,16.18,0,29.3-20.54,29.3-45.88S792,302.24,775.77,302.24Z"
    />
    <path d="M774.5,295.5c-10,0-34,8-44,8-28.11,0-27.42-10-56-10-15,0-31.84,9.83-51,18-19.9,8.48-46,7.12-46,43,0,12,3.77,51,45,51,30.1,0,59.16-27,87-27,11.56,0,20.16,3,30,3,6,0,13-1,15-3v-17s-1.31,1-6,1c-2,0-4-4-4-6,0-10.5,55-15.61,55-35,1.54,2.71,3.75,10.11,4.12,12.34,1.73-2.25,5.12-6,5.12-12.81C808.74,307.23,797.9,295.5,774.5,295.5Z" />
    <path
      className="cls-12"
      d="M728.73,413.72c17.76,10.87-11.69,89.56-21.62,88s-49-24.71-49-34.41S710,402.25,728.73,413.72Z"
    />
    <circle className="cls-8" cx="934.09" cy="609.77" r="12.25" />
    <path
      className="cls-2"
      d="M393.06,191.53a106.6,106.6,0,1,1-55.95-15.85V282.27Z"
    />
    <path className="cls-2" d="M337.11,282.27H443.7" />
    <path
      className="cls-2"
      d="M524,261.92c2.51,0,10.85-24.46,27.68-24.46,14.85,0,7.49,50.9,37.89,50.9,24.32,0,30.83-33.37,40.3-33.37,4.95,0,4.67,3.68,9.62,3.68,12,0,13.71-48.36,30.82-48.36"
    />
    <polyline
      className="cls-2"
      points="241.87 627.21 303.59 565.49 336.22 598.11 463.67 470.66 487.77 494.77 556.24 426.29 602.89 472.94 686.45 389.38"
    />
  </svg>
);

const VisionIcon = ({ className }: { className?: string }) => (
  <svg
    id="Layer_2"
    data-name="Layer 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1200"
    className={className}
  >
    <defs>
      <style>{`.cls-1{fill:#e2e2e2;}.cls-2{fill:#f3f3f3;}.cls-3{fill:#d37c59;}.cls-4{fill:#de8e68;}.cls-5{fill:#56cad8;}.cls-6{fill:#74d5de;}.cls-7{fill:#fed385;}.cls-8{fill:#dc8e6c;}.cls-9{fill:#fb836d;}.cls-10{fill:#d3d3d3;}.cls-11,.cls-13,.cls-14,.cls-15,.cls-16{fill:none;}.cls-11{stroke:#d3d3d3;stroke-miterlimit:10;}.cls-11,.cls-14,.cls-15{stroke-width:3.69px;}.cls-12{fill:#fed892;}.cls-13,.cls-14,.cls-16{stroke:#fed385;}.cls-13,.cls-14,.cls-15,.cls-16{stroke-linecap:round;stroke-linejoin:round;}.cls-13{stroke-width:3.84px;}.cls-15{stroke:#74d5de;}.cls-16{stroke-width:2.39px;}`}</style>
    </defs>
    <title>Artboard 1</title>
    <path
      className="cls-1"
      d="M711.1,528.1c0-21.86-47-74.85-84.67-74.85-28.93,0-29.4,15.3-57.59,15.3-43.46,0-75.71-72.66-159.29-72.66-89.05,0-205.41,83.58-205.41,149.14C204.14,638.91,711.1,661.41,711.1,528.1Z"
    />
    <path
      className="cls-2"
      d="M935.51,849.68c1-102,2.6-265.85,2.6-290.1,0-35.58-52.84-142.15-145.27-142.15-101.26,0-151.3,116.21-217.58,116.21-60.75,0-65.54-30.76-140.74-30.76-49,0-149.82,62.8-149.82,127l67.11,219.75Z"
    />
    <ellipse
      className="cls-3"
      cx="602.59"
      cy="679.96"
      rx="11.73"
      ry="5.25"
      transform="translate(-105.6 1249.11) rotate(-87.24)"
    />
    <path
      className="cls-3"
      d="M590.19,739.68c-.2-1.94,4.32-42.23,7.92-55a16,16,0,0,1,6.71-.94l-.34,39.7-5,18.67Z"
    />
    <polygon points="620.7 683.58 589.26 686.18 588.26 679.96 618.52 670.39 620.7 683.58" />
    <rect className="cls-4" x="544.3" y="999.24" width="13.77" height="11.65" />
    <rect
      className="cls-4"
      x="586.9"
      y="1001.06"
      width="13.77"
      height="11.65"
    />
    <path
      className="cls-5"
      d="M542.87,805V999.88H559l18.54-104.26S580.09,839.22,542.87,805Z"
    />
    <path
      className="cls-6"
      d="M596,801.16c.45,5.62,6.06,107.88,6.06,107.88v93.11l-16.55,1.77-10.64-99-32-99.92C547.71,802.34,583.16,797.33,596,801.16Z"
    />
    <path
      className="cls-7"
      d="M566.51,715.47c31.79,0,33.3,80.83,29.52,85.69s-49,8.17-53.16,3.83S526.9,715.47,566.51,715.47Z"
    />
    <ellipse
      className="cls-4"
      cx="607.86"
      cy="679.96"
      rx="11.73"
      ry="5.25"
      transform="translate(-100.59 1254.37) rotate(-87.24)"
    />
    <polygon points="585.61 1010.89 585.61 1022.54 618.35 1022.54 618.35 1018.3 601.32 1010.89 585.61 1010.89" />
    <polygon points="543.87 1009.05 543.87 1020.7 576.61 1020.7 576.61 1016.46 559.58 1009.05 543.87 1009.05" />
    <rect
      x="585.55"
      y="681.34"
      width="3.86"
      height="3.86"
      transform="translate(-98.87 99.39) rotate(-8.92)"
    />
    <path
      className="cls-3"
      d="M568.84,722.5c0,2.67-12.41,3-12.41,0V696h12.41Z"
    />
    <ellipse className="cls-8" cx="568.46" cy="688.32" rx="13.03" ry="19.89" />
    <path
      className="cls-9"
      d="M545.77,680.12c0-6.13,2.67-10,4.84-11.23,4.19-2.4,5.94-1.33,10.16-3.2,4.57-2,8.49-7.84,13.84-7.84,5,0,4.55,2.84,7.94,3.68,2,.49,13.36-2.12,13.36,5.23,0,11.32-12.57,12.24-15.48,13.69a37.43,37.43,0,0,0-1.52-3.83c-2.29,2.36-10.58,4-11.92,4.53-3.1,1.28-4.58,6.13-4.58,9.3s-2.87,3.18-3.59,3.18C552.19,693.63,545.77,689.38,545.77,680.12Z"
    />
    <circle className="cls-8" cx="556.67" cy="691.67" r="4.33" />
    <rect
      className="cls-10"
      x="512.81"
      y="718.34"
      width="25.14"
      height="84.61"
      rx="12.57"
      ry="12.57"
    />
    <ellipse className="cls-11" cx="544.89" cy="751.24" rx="30.38" ry="32.89" />
    <path
      className="cls-4"
      d="M576.84,736.83c2.53,0,15.29.53,20.48,2.4.4-2.53,2.66-38.77,6.51-50.91,1.47-1.62,7.45-1.43,7.45,0s8.51,60.88,0,67.93-37.37-2.4-38.56-3.33S576.84,736.83,576.84,736.83Z"
    />
    <path
      className="cls-12"
      d="M549.66,734.69c2.82-11.48,28.36-1.93,30.67.69,2.77,3.14-2.18,20.84-6,21.66C568.1,758.39,546,749.58,549.66,734.69Z"
    />
    <polygon
      className="cls-12"
      points="266.38 341.65 142.64 849.68 390.13 849.68 266.38 341.65"
    />
    <polygon
      className="cls-5"
      points="169.62 341.65 45.87 893.9 293.36 893.9 169.62 341.65"
    />
    <line className="cls-13" x1="170.29" y1="891.44" x2="170.29" y2="395.36" />
    <line className="cls-13" x1="170.29" y1="558.95" x2="197.18" y2="529.72" />
    <line className="cls-13" x1="170.29" y1="698.94" x2="210.7" y2="655.02" />
    <line className="cls-13" x1="170.29" y1="844.98" x2="233.14" y2="776.66" />
    <line className="cls-13" x1="170.29" y1="558.95" x2="143.4" y2="529.72" />
    <line className="cls-13" x1="170.29" y1="698.94" x2="129.89" y2="655.02" />
    <line className="cls-13" x1="170.29" y1="844.98" x2="107.44" y2="776.66" />
    <rect
      className="cls-6"
      x="190.5"
      y="734.34"
      width="135.39"
      height="197.16"
      rx="67.69"
      ry="67.69"
    />
    <line className="cls-14" x1="258.19" y1="982.94" x2="258.19" y2="795.85" />
    <path className="cls-14" d="M258.19,875.41c37,0,37-22.28,37-56" />
    <path
      className="cls-14"
      d="M258.19,841.33c-25.65,0-25.65-15.47-25.65-38.84"
    />
    <path
      className="cls-7"
      d="M1152.37,849.68V667.57a81.52,81.52,0,0,0-81.28-81.28h0a81.65,81.65,0,0,0-13.07,1.06V377.78a55.64,55.64,0,0,0-55.63-55.64h0a55.64,55.64,0,0,0-55.64,55.64v44.86a80.64,80.64,0,0,0-26-4.31h0a81.52,81.52,0,0,0-81.28,81.29V649H804.08a55.7,55.7,0,0,0-55.53,55.53V833.86a55.18,55.18,0,0,0,2.32,15.82Z"
    />
    <path className="cls-15" d="M1000.16,740.85c91.61,0,91.61-41,91.61-103" />
    <path
      className="cls-15"
      d="M1000.25,795.48c-50.4,0-50.4-22.56-50.4-56.67"
    />
    <line
      className="cls-15"
      x1="1000.16"
      y1="849.68"
      x2="1000.16"
      y2="364.17"
    />
    <line className="cls-15" x1="1000.16" y1="637.85" x2="949.94" y2="587.62" />
    <line
      className="cls-15"
      x1="1000.16"
      y1="534.21"
      x2="1030.55"
      y2="503.83"
    />
    <path
      className="cls-2"
      d="M750.49,341.65a47.18,47.18,0,0,0-86.25-35.55,37.43,37.43,0,0,0-52.84,34.1c0,.49,0,1,0,1.45Z"
    />
    <path
      className="cls-2"
      d="M291.91,268.28a47.18,47.18,0,0,1,86.25-35.55A37.4,37.4,0,0,1,431,266.83c0,.48,0,1,0,1.45Z"
    />
    <path
      className="cls-6"
      d="M924.33,936.06c-50.28,0-91,21.47-91,48h182.05C1015.35,957.53,974.6,936.06,924.33,936.06Z"
    />
    <path
      className="cls-9"
      d="M502.76,1006.93c-12.55,0-22.73,8.76-22.73,19.57H525.5C525.5,1015.69,515.32,1006.93,502.76,1006.93Z"
    />
    <path
      className="cls-9"
      d="M833.3,902.44c-12.56,0-22.73,13-22.73,29.06H856C856,915.45,845.85,902.44,833.3,902.44Z"
    />
    <path
      className="cls-9"
      d="M120.87,974.57c-20,0-36.16,6.51-36.16,14.53H157C157,981.08,140.84,974.57,120.87,974.57Z"
    />
    <path
      className="cls-9"
      d="M1030.55,974.57c-20,0-36.16,6.51-36.16,14.53h72.31C1066.7,981.08,1050.52,974.57,1030.55,974.57Z"
    />
    <rect
      className="cls-6"
      x="838.22"
      y="746.55"
      width="87.67"
      height="127.66"
      rx="43.83"
      ry="43.83"
    />
    <line className="cls-16" x1="882.06" y1="907.53" x2="882.06" y2="786.38" />
    <path
      className="cls-16"
      d="M882.06,837.9C906,837.9,906,823.47,906,801.64"
    />
    <path className="cls-16" d="M882.06,815.83c-16.61,0-16.61-10-16.61-25.16" />
    <line className="cls-14" x1="331.71" y1="947.65" x2="412.75" y2="947.65" />
    <line className="cls-14" x1="668.4" y1="893.9" x2="722.14" y2="893.9" />
    <line className="cls-14" x1="627.87" y1="907.53" x2="681.62" y2="907.53" />
    <line className="cls-14" x1="116.88" y1="918.64" x2="170.63" y2="918.64" />
    <line className="cls-14" x1="748.55" y1="999.24" x2="824.1" y2="999.24" />
  </svg>
);

const ValuesIcon = ({ className }: { className?: string }) => (
  <svg
    version="1.1"
    id="Vector"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1200 1200"
    enableBackground="new 0 0 1200 1200"
    xmlSpace="preserve"
    className={className}
  >
    <style type="text/css">{`.st0{fill:#DE8E68;}.st1{fill:#56CAD8;}.st2{fill:#74D5DE;}.st3{fill:#FCC486;}.st4{fill:#FED385;}.st5{fill:#D37C59;}.st6{fill:#DFDFDF;}.st7{fill:#F2F2F2;}.st8{fill:#FED892;}.st9{fill:#FFFFFF;}.st10{font-family:'SofiaProBlack';}.st11{font-size:108.2px;}.st12{fill:none;stroke:#000000;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}</style>
    <title>Artboard 1</title>
    <rect x="511.3" y="993.4" className="st0" width="25.5" height="17.5" />
    <rect x="673.5" y="993.4" className="st0" width="29.8" height="17.5" />
    <path
      className="st1"
      d="M672.4,597.5c0.7,13.2,31.8,395.9,31.8,395.9h-31.8L589.7,706c0,0,21.5-115,23-114.7C619.8,593.1,658.7,600,672.4,597.5z"
    />
    <path
      className="st2"
      d="M626,594.2l-85.7,402.3h-30.7c0,0-2.7-440.9,0-440.9C538.4,567.8,592.8,587.8,626,594.2z"
    />
    <path
      className="st0"
      d="M694.4,375.2c4.9,2.1,31.1,23.8,42.1,38.1c8.2-6.1,101.8-83.8,103.7-88.1c3.7-2.1,11.6,9.8,0,19.5c7.9-0.3,54.6-1.5,54.6,0s10.1,5.8-58.5,16.8c-9.1,11-91.5,107.9-104.9,107.9s-68-53-70.3-62.5S694.4,375.2,694.4,375.2z"
    />
    <path
      className="st3"
      d="M623.1,332.1C601.7,352,640.9,412,652,414.6c14.1,3.4,46.3-23.3,53.2-41.8C708.3,364.1,640.7,315.8,623.1,332.1z"
    />
    <path
      className="st4"
      d="M584.7,303.1c-119,0-92,229.7-84.4,245.4s160,61.3,172,49S706.4,303.1,584.7,303.1z"
    />
    <path className="st5" d="M605.2,272.2h-36v52.3c0,6.7,36,6.7,36,0V272.2z" />
    <ellipse className="st0" cx="586.8" cy="222.2" rx="41" ry="68.8" />
    <path d="M580,138c-20.7,0-48.1,10-68,10c-18,0-50.7-13-68-13c-11,0-63,5.1-63,47c0,18.9,20,37,24,42s11.3,33,30,33c26.1,0,44.1-19,68-19c16.5,0,20.8,4,29,4c6,0,15-2.8,15-3c0-3.1-0.6-29,3-33.2c5-6,68.7,2.9,68.7-18.2c4.5,4,8.7,21,8.7,24.5c2.9-3,13.7-16,13.7-30C641,169.3,632,138,580,138z" />
    <rect
      x="441.4"
      y="513.9"
      transform="matrix(0.9972 -7.463064e-02 7.463064e-02 0.9972 -41.7723 38.1687)"
      className="st6"
      width="96.8"
      height="128.3"
    />
    <rect
      x="451.5"
      y="523.2"
      transform="matrix(0.9972 -7.463064e-02 7.463064e-02 0.9972 -42.4386 38.9452)"
      className="st7"
      width="96.8"
      height="128.3"
    />
    <ellipse className="st0" cx="494.2" cy="628.1" rx="19.1" ry="26.9" />
    <path
      className="st0"
      d="M482.1,402.5c-2.5,5.6-19,68.1-15.5,121.5s12.6,83.5,12.6,87.7s30.6,2.5,30.6,0s-7.9-78.5-6.2-92s24.6-91.6,24-101.2S482.1,402.5,482.1,402.5z"
    />
    <path
      className="st8"
      d="M527,335.9c-27.3-8.7-59.6,53.6-56.5,64.4c3.9,13.6,42,28.4,61.1,25.4C540.6,424.2,549.4,343.1,527,335.9z"
    />
    <polygon points="510,1006.9 510,1014.6 479.6,1071.6 499.4,1071.6 539,1035.7 539,1006.9 " />
    <polygon points="672.5,1005.7 672.5,1034.6 757,1034.6 757,1023.2 703.4,1005.7 " />
    <circle className="st6" cx="348" cy="365.1" r="68.3" />
    <polygon className="st6" points="445.1,315.5 363,332 383.1,371.9 " />
    <polygon className="st6" points="715.3,211.5 796.1,233.8 796.1,189.1 " />
    <text transform="matrix(1 0 0 1 325.59 402.02)" className="st9 st10 st11">
      ?
    </text>
    <rect x="746.1" y="153.4" className="st6" width="156" height="108.6" />
    <circle className="st9" cx="788.8" cy="207.7" r="7.5" />
    <circle className="st9" cx="824" cy="207.7" r="7.5" />
    <circle className="st9" cx="859.3" cy="207.7" r="7.5" />
    <path
      className="st12"
      d="M527.1,529.5c0.3,3.4-2.3,6.3-5.7,6.6l0,0c-3.4,0.3-6.3-2.3-6.6-5.7l-1.5-20.3c-0.3-3.4,2.3-6.3,5.7-6.6l0,0c3.4-0.3,6.3,2.3,6.6,5.7l0.8,10.8"
    />
  </svg>
);

// --- Data for the cards ---
// This makes the component clean and easy to update.
const cardData = [
  {
    title: "Our Mission",
    description:
      "Empowering incarcerated women with essential resources and education to uphold dignity and build pathways to successful reintegration.",
    icon: MissionIcon,
    iconPosition: "top",
  },
  {
    title: "Our Vision",
    description:
      "A world where every woman has the hope and opportunity to rebuild her life, creating a positive future for herself and her family.",
    icon: VisionIcon,
    iconPosition: "bottom",
  },
  {
    title: "Our Core Values",
    description:
      "Rooted in compassion, integrity, and respect. We champion empowerment through dignity and believe in the power of second chances.",
    icon: ValuesIcon,
    iconPosition: "top",
  },
];

const VisionMissionSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const baseAnimation = "transition-all duration-1000 ease-out";
  const animationClasses = inView
    ? "opacity-100 translate-y-0 blur-0"
    : "opacity-0 translate-y-20 blur-sm";

  return (
    <section
      ref={ref}
      className="bg-neutral-light w-11/12 py-20 md:py-28 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div
          className={`bg-white  max-w-4xl  py-8 md:py-12 mb-16 ${baseAnimation} ${animationClasses}`}
        >
          <SectionIndicator text="vision and mission" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
            Creating Hope and Opportunity Behind Bars
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Dedicated to breaking the cycle of incarceration through tangible
            support and a firm belief in the potential of every woman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card, index) => {
            const Icon = card.icon; 
            const textContent = (
              <div className="text-left">
                <div className="w-12 h-1 bg-neutral-dark rounded-full mb-4"></div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-base">{card.description}</p>
              </div>
            );

            const imageContent = (
              <div className="w-full h-64 flex items-center justify-center p-4">
                <Icon className="w-full h-full object-contain" />
              </div>
            );

            return (
              <div
                key={card.title}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${baseAnimation} ${animationClasses}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {card.iconPosition === "top" && imageContent}

                <div className="p-8 flex-grow flex flex-col justify-center">
                  <div className="w-14 h-[3px] bg-brand-dark-gray"></div>
                  {textContent}
                </div>

                {card.iconPosition === "bottom" && imageContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;