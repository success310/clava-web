import React from 'react';
import { JerseyModeEnum } from '../../../client/api';

const Jersey: React.FC<{
  color1: string;
  color2: string;
  mode: JerseyModeEnum;
  size: string;
}> = ({ color1, size, color2, mode }) => (
  <svg viewBox="0 0 917 987" width={size} height={size}>
    <path
      id="clava-trikot-left"
      fill={color1}
      d="M458.056,955.889c-168.556,-0 -235.556,-30.611 -253.389,-41l-0,-546.278c-0,-8.555 -0.889,-84.722 -30.778,-118.333c-5.611,-6.278 -15.278,-6.834 -21.556,-1.222c-6.277,5.611 -6.833,15.222 -1.277,21.555c18.888,21.167 23.055,77.945 23.055,98.056l0,89.5c-65.5,3.222 -123.444,-27 -143.111,-38.611c9.722,-152 48.833,-255.834 60.778,-284.445c12.833,-30.722 129.111,-76.278 214.666,-101.5c14.834,29.889 59.5,100.278 151.556,100.278l-0,822l0.056,-0Z"
    />
    <path
      id="clava-trikot-right"
      d="M458.056,133.833c92.055,0 136.722,-70.389 151.555,-100.277c85.556,25.222 201.833,70.777 214.667,101.5c11.944,28.611 51,132.444 60.778,284.444c-19.667,11.611 -77.667,41.889 -143.112,38.611l0,-89.5c0,-20.111 4.223,-76.889 23.056,-98.055c5.611,-6.278 5.056,-15.945 -1.278,-21.556c-6.333,-5.611 -15.944,-5.056 -21.555,1.222c-29.945,33.611 -30.778,109.778 -30.778,118.334l-0,546.222c-18.111,10.5 -85.167,41 -253.389,41l0,-821.945l0.056,0Z"
      fill={mode === JerseyModeEnum.DUO ? color2 : color1}
    />
    {mode === JerseyModeEnum.HORIZONTAL_STRIPE ? (
      <>
        <path
          fill={color2}
          d="M816.646,161.284c9.199,0.005 16.671,-7.458 16.677,-16.657l0.02,-33.333c0.006,-9.199 -7.458,-16.671 -16.656,-16.677l-716.667,-0.437c-9.198,-0.005 -16.671,7.458 -16.676,16.657l-0.021,33.333c-0.005,9.199 7.458,16.671 16.657,16.677l716.666,0.437Z"
        />
        <path
          d="M877.757,289.112l0.041,-66.666l-844.444,-0.515l-0.041,66.667l844.444,0.514Z"
          fill={color2}
        />
        <path
          d="M888.868,416.9l0.041,-66.666l-861.111,-0.525l-0.04,66.667l861.11,0.524Z"
          fill={color2}
        />
        <path
          d="M733.313,544.583l0.041,-66.666l-555.556,-0.339l-0.04,66.667l555.555,0.338Z"
          fill={color2}
        />
        <path
          d="M733.313,672.361l0.041,-66.667l-555.556,-0.338l-0.04,66.666l555.555,0.339Z"
          fill={color2}
        />
        <path
          d="M733.313,800.139l0.041,-66.667l-555.556,-0.338l-0.04,66.666l555.555,0.339Z"
          fill={color2}
        />
        <path
          d="M722.202,927.917l0.04,-66.667l-527.777,-0.322l-0.041,66.667l527.778,0.322Z"
          fill={color2}
        />
      </>
    ) : mode === JerseyModeEnum.VERTICAL_STRIPE ? (
      <>
        <rect
          x="222.222"
          y="38.889"
          width="66.667"
          height="916.667"
          fill={color2}
        />
        <rect
          x="361.111"
          y="44.444"
          width="66.667"
          height="911.111"
          fill={color2}
        />
        <rect
          x="494.444"
          y="44.444"
          width="66.667"
          height="911.111"
          fill={color2}
        />
        <rect
          x="627.778"
          y="33.333"
          width="66.667"
          height="922.222"
          fill={color2}
        />
      </>
    ) : null}
    <path
      strokeWidth={2}
      stroke="#fff"
      fill="#fff"
      id="clava-trikot-outline"
      d="M852.444,123.278c-24,-57.556 -210.166,-112.334 -247.222,-122.778c-0.444,-0.111 -0.889,-0.167 -1.278,-0.222c-0.277,-0 -0.555,-0.111 -0.833,-0.167c-0.722,-0.111 -1.444,-0.111 -2.167,-0.111l-0.777,-0c-0.778,-0 -1.5,0.167 -2.278,0.333c-0.167,0 -0.389,0.056 -0.556,0.111c-0.777,0.223 -1.555,0.5 -2.277,0.778c-0.112,0.056 -0.278,0.111 -0.389,0.167c-0.111,-0 -0.167,0.055 -0.278,0.111c-44.389,21.722 -74.611,31.389 -136.333,31.389c-61.723,-0 -91.945,-9.667 -136.334,-31.389l-0.166,0c-0.389,-0.167 -0.834,-0.333 -1.223,-0.444c-0.5,-0.167 -0.944,-0.389 -1.444,-0.5c-0.445,-0.112 -0.889,-0.167 -1.333,-0.223c-0.5,-0.111 -1,-0.166 -1.5,-0.222l-1.334,0c-0.5,0 -1,0 -1.555,0.056c-0.445,-0 -0.834,0.166 -1.278,0.222c-0.333,0.055 -0.667,0.111 -1.056,0.167c-37.055,10.388 -223.222,65.166 -247.222,122.722c-12.611,30.278 -54.611,141.722 -63.611,303.5c-0.278,5.333 2.222,10.389 6.556,13.389c3.277,2.277 77.277,52.444 167.555,48.5l0,434.333c0,4.389 1.889,8.611 5.222,11.5c1.667,1.444 17.5,14.611 59.889,27.222c55.111,16.389 128.722,24.667 218.778,24.667c90.056,-0 163.667,-8.333 218.778,-24.667c42.444,-12.611 58.278,-25.722 59.944,-27.222c3.334,-2.889 5.222,-7.056 5.222,-11.5l0,-434.333c90.167,3.944 164.223,-46.223 167.556,-48.5c4.389,-3 6.889,-8.111 6.556,-13.389c-9,-161.722 -50.945,-273.167 -63.612,-303.445l0,-0.055Zm-110.5,334.833l0,-89.5c0,-20.111 4.223,-76.889 23.056,-98.055c5.611,-6.278 5.056,-15.945 -1.278,-21.556c-6.333,-5.611 -15.944,-5.056 -21.555,1.222c-29.945,33.611 -30.778,109.778 -30.778,118.334l-0,546.222c-18.111,10.5 -85.167,41 -253.389,41c-168.222,-0 -235.556,-30.611 -253.389,-41l0,-546.167c0,-8.555 -0.889,-84.722 -30.778,-118.333c-5.611,-6.278 -15.277,-6.834 -21.555,-1.222c-6.278,5.611 -6.834,15.222 -1.278,21.555c18.889,21.167 23.056,77.945 23.056,98.056l-0,89.5c-65.5,3.222 -123.445,-27 -143.112,-38.611c9.723,-152 48.834,-255.834 60.778,-284.445c12.834,-30.722 129.111,-76.278 214.667,-101.5c14.833,29.889 59.5,100.278 151.555,100.278c92.056,-0 136.723,-70.389 151.556,-100.278c85.556,25.222 201.833,70.778 214.667,101.5c11.944,28.611 51,132.445 60.777,284.445c-19.666,11.611 -77.666,41.888 -143.111,38.611l0.111,-0.056Z"
    />
  </svg>
);

export default Jersey;
// reload
