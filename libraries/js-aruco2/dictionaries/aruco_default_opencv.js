/*
By downloading, copying, installing or using the software you agree to this
license. If you do not agree to this license, do not download, install,
copy or use the software.
                          License Agreement
               For Open Source Computer Vision Library
                       (3-clause BSD License)
Copyright (C) 2013, OpenCV Foundation, all rights reserved.
Third party copyrights are property of their respective owners.
Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:
  * Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
  * Neither the names of the copyright holders nor the names of the contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.
This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall copyright holders or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused
and on any theory of liability, whether in contract, strict liability,
or tort (including negligence or otherwise) arising in any way out of
the use of this software, even if advised of the possibility of such damage.
*/

//Dictionary extracted from https://github.com/opencv/opencv_contrib/blob/4.x/modules/aruco/src/predefined_dictionaries.hpp

var AR = this.AR || require('../aruco').AR;
AR.DICTIONARIES['ARUCO_DEFAULT_OPENCV'] = {
  nBits: 25,
  tau: 3,
  codeList: [[132,33,8,0],[132,33,11,1],[132,33,4,1],[132,33,7,0],[132,33,120,0],[132,33,123,1],[132,33,116,1],[132,33,119,0],[132,32,152,0],[132,32,155,1],[132,32,148,1],[132,32,151,0],[132,32,232,0],[132,32,235,1],[132,32,228,1],[132,32,231,0],[132,47,8,0],[132,47,11,1],[132,47,4,1],[132,47,7,0],[132,47,120,0],[132,47,123,1],[132,47,116,1],[132,47,119,0],[132,46,152,0],[132,46,155,1],[132,46,148,1],[132,46,151,0],[132,46,232,0],[132,46,235,1],[132,46,228,1],[132,46,231,0],[132,19,8,0],[132,19,11,1],[132,19,4,1],[132,19,7,0],[132,19,120,0],[132,19,123,1],[132,19,116,1],[132,19,119,0],[132,18,152,0],[132,18,155,1],[132,18,148,1],[132,18,151,0],[132,18,232,0],[132,18,235,1],[132,18,228,1],[132,18,231,0],[132,29,8,0],[132,29,11,1],[132,29,4,1],[132,29,7,0],[132,29,120,0],[132,29,123,1],[132,29,116,1],[132,29,119,0],[132,28,152,0],[132,28,155,1],[132,28,148,1],[132,28,151,0],[132,28,232,0],[132,28,235,1],[132,28,228,1],[132,28,231,0],[133,225,8,0],[133,225,11,1],[133,225,4,1],[133,225,7,0],[133,225,120,0],[133,225,123,1],[133,225,116,1],[133,225,119,0],[133,224,152,0],[133,224,155,1],[133,224,148,1],[133,224,151,0],[133,224,232,0],[133,224,235,1],[133,224,228,1],[133,224,231,0],[133,239,8,0],[133,239,11,1],[133,239,4,1],[133,239,7,0],[133,239,120,0],[133,239,123,1],[133,239,116,1],[133,239,119,0],[133,238,152,0],[133,238,155,1],[133,238,148,1],[133,238,151,0],[133,238,232,0],[133,238,235,1],[133,238,228,1],[133,238,231,0],[133,211,8,0],[133,211,11,1],[133,211,4,1],[133,211,7,0],[133,211,120,0],[133,211,123,1],[133,211,116,1],[133,211,119,0],[133,210,152,0],[133,210,155,1],[133,210,148,1],[133,210,151,0],[133,210,232,0],[133,210,235,1],[133,210,228,1],[133,210,231,0],[133,221,8,0],[133,221,11,1],[133,221,4,1],[133,221,7,0],[133,221,120,0],[133,221,123,1],[133,221,116,1],[133,221,119,0],[133,220,152,0],[133,220,155,1],[133,220,148,1],[133,220,151,0],[133,220,232,0],[133,220,235,1],[133,220,228,1],[133,220,231,0],[130,97,8,0],[130,97,11,1],[130,97,4,1],[130,97,7,0],[130,97,120,0],[130,97,123,1],[130,97,116,1],[130,97,119,0],[130,96,152,0],[130,96,155,1],[130,96,148,1],[130,96,151,0],[130,96,232,0],[130,96,235,1],[130,96,228,1],[130,96,231,0],[130,111,8,0],[130,111,11,1],[130,111,4,1],[130,111,7,0],[130,111,120,0],[130,111,123,1],[130,111,116,1],[130,111,119,0],[130,110,152,0],[130,110,155,1],[130,110,148,1],[130,110,151,0],[130,110,232,0],[130,110,235,1],[130,110,228,1],[130,110,231,0],[130,83,8,0],[130,83,11,1],[130,83,4,1],[130,83,7,0],[130,83,120,0],[130,83,123,1],[130,83,116,1],[130,83,119,0],[130,82,152,0],[130,82,155,1],[130,82,148,1],[130,82,151,0],[130,82,232,0],[130,82,235,1],[130,82,228,1],[130,82,231,0],[130,93,8,0],[130,93,11,1],[130,93,4,1],[130,93,7,0],[130,93,120,0],[130,93,123,1],[130,93,116,1],[130,93,119,0],[130,92,152,0],[130,92,155,1],[130,92,148,1],[130,92,151,0],[130,92,232,0],[130,92,235,1],[130,92,228,1],[130,92,231,0],[131,161,8,0],[131,161,11,1],[131,161,4,1],[131,161,7,0],[131,161,120,0],[131,161,123,1],[131,161,116,1],[131,161,119,0],[131,160,152,0],[131,160,155,1],[131,160,148,1],[131,160,151,0],[131,160,232,0],[131,160,235,1],[131,160,228,1],[131,160,231,0],[131,175,8,0],[131,175,11,1],[131,175,4,1],[131,175,7,0],[131,175,120,0],[131,175,123,1],[131,175,116,1],[131,175,119,0],[131,174,152,0],[131,174,155,1],[131,174,148,1],[131,174,151,0],[131,174,232,0],[131,174,235,1],[131,174,228,1],[131,174,231,0],[131,147,8,0],[131,147,11,1],[131,147,4,1],[131,147,7,0],[131,147,120,0],[131,147,123,1],[131,147,116,1],[131,147,119,0],[131,146,152,0],[131,146,155,1],[131,146,148,1],[131,146,151,0],[131,146,232,0],[131,146,235,1],[131,146,228,1],[131,146,231,0],[131,157,8,0],[131,157,11,1],[131,157,4,1],[131,157,7,0],[131,157,120,0],[131,157,123,1],[131,157,116,1],[131,157,119,0],[131,156,152,0],[131,156,155,1],[131,156,148,1],[131,156,151,0],[131,156,232,0],[131,156,235,1],[131,156,228,1],[131,156,231,0],[188,33,8,0],[188,33,11,1],[188,33,4,1],[188,33,7,0],[188,33,120,0],[188,33,123,1],[188,33,116,1],[188,33,119,0],[188,32,152,0],[188,32,155,1],[188,32,148,1],[188,32,151,0],[188,32,232,0],[188,32,235,1],[188,32,228,1],[188,32,231,0],[188,47,8,0],[188,47,11,1],[188,47,4,1],[188,47,7,0],[188,47,120,0],[188,47,123,1],[188,47,116,1],[188,47,119,0],[188,46,152,0],[188,46,155,1],[188,46,148,1],[188,46,151,0],[188,46,232,0],[188,46,235,1],[188,46,228,1],[188,46,231,0],[188,19,8,0],[188,19,11,1],[188,19,4,1],[188,19,7,0],[188,19,120,0],[188,19,123,1],[188,19,116,1],[188,19,119,0],[188,18,152,0],[188,18,155,1],[188,18,148,1],[188,18,151,0],[188,18,232,0],[188,18,235,1],[188,18,228,1],[188,18,231,0],[188,29,8,0],[188,29,11,1],[188,29,4,1],[188,29,7,0],[188,29,120,0],[188,29,123,1],[188,29,116,1],[188,29,119,0],[188,28,152,0],[188,28,155,1],[188,28,148,1],[188,28,151,0],[188,28,232,0],[188,28,235,1],[188,28,228,1],[188,28,231,0],[189,225,8,0],[189,225,11,1],[189,225,4,1],[189,225,7,0],[189,225,120,0],[189,225,123,1],[189,225,116,1],[189,225,119,0],[189,224,152,0],[189,224,155,1],[189,224,148,1],[189,224,151,0],[189,224,232,0],[189,224,235,1],[189,224,228,1],[189,224,231,0],[189,239,8,0],[189,239,11,1],[189,239,4,1],[189,239,7,0],[189,239,120,0],[189,239,123,1],[189,239,116,1],[189,239,119,0],[189,238,152,0],[189,238,155,1],[189,238,148,1],[189,238,151,0],[189,238,232,0],[189,238,235,1],[189,238,228,1],[189,238,231,0],[189,211,8,0],[189,211,11,1],[189,211,4,1],[189,211,7,0],[189,211,120,0],[189,211,123,1],[189,211,116,1],[189,211,119,0],[189,210,152,0],[189,210,155,1],[189,210,148,1],[189,210,151,0],[189,210,232,0],[189,210,235,1],[189,210,228,1],[189,210,231,0],[189,221,8,0],[189,221,11,1],[189,221,4,1],[189,221,7,0],[189,221,120,0],[189,221,123,1],[189,221,116,1],[189,221,119,0],[189,220,152,0],[189,220,155,1],[189,220,148,1],[189,220,151,0],[189,220,232,0],[189,220,235,1],[189,220,228,1],[189,220,231,0],[186,97,8,0],[186,97,11,1],[186,97,4,1],[186,97,7,0],[186,97,120,0],[186,97,123,1],[186,97,116,1],[186,97,119,0],[186,96,152,0],[186,96,155,1],[186,96,148,1],[186,96,151,0],[186,96,232,0],[186,96,235,1],[186,96,228,1],[186,96,231,0],[186,111,8,0],[186,111,11,1],[186,111,4,1],[186,111,7,0],[186,111,120,0],[186,111,123,1],[186,111,116,1],[186,111,119,0],[186,110,152,0],[186,110,155,1],[186,110,148,1],[186,110,151,0],[186,110,232,0],[186,110,235,1],[186,110,228,1],[186,110,231,0],[186,83,8,0],[186,83,11,1],[186,83,4,1],[186,83,7,0],[186,83,120,0],[186,83,123,1],[186,83,116,1],[186,83,119,0],[186,82,152,0],[186,82,155,1],[186,82,148,1],[186,82,151,0],[186,82,232,0],[186,82,235,1],[186,82,228,1],[186,82,231,0],[186,93,8,0],[186,93,11,1],[186,93,4,1],[186,93,7,0],[186,93,120,0],[186,93,123,1],[186,93,116,1],[186,93,119,0],[186,92,152,0],[186,92,155,1],[186,92,148,1],[186,92,151,0],[186,92,232,0],[186,92,235,1],[186,92,228,1],[186,92,231,0],[187,161,8,0],[187,161,11,1],[187,161,4,1],[187,161,7,0],[187,161,120,0],[187,161,123,1],[187,161,116,1],[187,161,119,0],[187,160,152,0],[187,160,155,1],[187,160,148,1],[187,160,151,0],[187,160,232,0],[187,160,235,1],[187,160,228,1],[187,160,231,0],[187,175,8,0],[187,175,11,1],[187,175,4,1],[187,175,7,0],[187,175,120,0],[187,175,123,1],[187,175,116,1],[187,175,119,0],[187,174,152,0],[187,174,155,1],[187,174,148,1],[187,174,151,0],[187,174,232,0],[187,174,235,1],[187,174,228,1],[187,174,231,0],[187,147,8,0],[187,147,11,1],[187,147,4,1],[187,147,7,0],[187,147,120,0],[187,147,123,1],[187,147,116,1],[187,147,119,0],[187,146,152,0],[187,146,155,1],[187,146,148,1],[187,146,151,0],[187,146,232,0],[187,146,235,1],[187,146,228,1],[187,146,231,0],[187,157,8,0],[187,157,11,1],[187,157,4,1],[187,157,7,0],[187,157,120,0],[187,157,123,1],[187,157,116,1],[187,157,119,0],[187,156,152,0],[187,156,155,1],[187,156,148,1],[187,156,151,0],[187,156,232,0],[187,156,235,1],[187,156,228,1],[187,156,231,0],[76,33,8,0],[76,33,11,1],[76,33,4,1],[76,33,7,0],[76,33,120,0],[76,33,123,1],[76,33,116,1],[76,33,119,0],[76,32,152,0],[76,32,155,1],[76,32,148,1],[76,32,151,0],[76,32,232,0],[76,32,235,1],[76,32,228,1],[76,32,231,0],[76,47,8,0],[76,47,11,1],[76,47,4,1],[76,47,7,0],[76,47,120,0],[76,47,123,1],[76,47,116,1],[76,47,119,0],[76,46,152,0],[76,46,155,1],[76,46,148,1],[76,46,151,0],[76,46,232,0],[76,46,235,1],[76,46,228,1],[76,46,231,0],[76,19,8,0],[76,19,11,1],[76,19,4,1],[76,19,7,0],[76,19,120,0],[76,19,123,1],[76,19,116,1],[76,19,119,0],[76,18,152,0],[76,18,155,1],[76,18,148,1],[76,18,151,0],[76,18,232,0],[76,18,235,1],[76,18,228,1],[76,18,231,0],[76,29,8,0],[76,29,11,1],[76,29,4,1],[76,29,7,0],[76,29,120,0],[76,29,123,1],[76,29,116,1],[76,29,119,0],[76,28,152,0],[76,28,155,1],[76,28,148,1],[76,28,151,0],[76,28,232,0],[76,28,235,1],[76,28,228,1],[76,28,231,0],[77,225,8,0],[77,225,11,1],[77,225,4,1],[77,225,7,0],[77,225,120,0],[77,225,123,1],[77,225,116,1],[77,225,119,0],[77,224,152,0],[77,224,155,1],[77,224,148,1],[77,224,151,0],[77,224,232,0],[77,224,235,1],[77,224,228,1],[77,224,231,0],[77,239,8,0],[77,239,11,1],[77,239,4,1],[77,239,7,0],[77,239,120,0],[77,239,123,1],[77,239,116,1],[77,239,119,0],[77,238,152,0],[77,238,155,1],[77,238,148,1],[77,238,151,0],[77,238,232,0],[77,238,235,1],[77,238,228,1],[77,238,231,0],[77,211,8,0],[77,211,11,1],[77,211,4,1],[77,211,7,0],[77,211,120,0],[77,211,123,1],[77,211,116,1],[77,211,119,0],[77,210,152,0],[77,210,155,1],[77,210,148,1],[77,210,151,0],[77,210,232,0],[77,210,235,1],[77,210,228,1],[77,210,231,0],[77,221,8,0],[77,221,11,1],[77,221,4,1],[77,221,7,0],[77,221,120,0],[77,221,123,1],[77,221,116,1],[77,221,119,0],[77,220,152,0],[77,220,155,1],[77,220,148,1],[77,220,151,0],[77,220,232,0],[77,220,235,1],[77,220,228,1],[77,220,231,0],[74,97,8,0],[74,97,11,1],[74,97,4,1],[74,97,7,0],[74,97,120,0],[74,97,123,1],[74,97,116,1],[74,97,119,0],[74,96,152,0],[74,96,155,1],[74,96,148,1],[74,96,151,0],[74,96,232,0],[74,96,235,1],[74,96,228,1],[74,96,231,0],[74,111,8,0],[74,111,11,1],[74,111,4,1],[74,111,7,0],[74,111,120,0],[74,111,123,1],[74,111,116,1],[74,111,119,0],[74,110,152,0],[74,110,155,1],[74,110,148,1],[74,110,151,0],[74,110,232,0],[74,110,235,1],[74,110,228,1],[74,110,231,0],[74,83,8,0],[74,83,11,1],[74,83,4,1],[74,83,7,0],[74,83,120,0],[74,83,123,1],[74,83,116,1],[74,83,119,0],[74,82,152,0],[74,82,155,1],[74,82,148,1],[74,82,151,0],[74,82,232,0],[74,82,235,1],[74,82,228,1],[74,82,231,0],[74,93,8,0],[74,93,11,1],[74,93,4,1],[74,93,7,0],[74,93,120,0],[74,93,123,1],[74,93,116,1],[74,93,119,0],[74,92,152,0],[74,92,155,1],[74,92,148,1],[74,92,151,0],[74,92,232,0],[74,92,235,1],[74,92,228,1],[74,92,231,0],[75,161,8,0],[75,161,11,1],[75,161,4,1],[75,161,7,0],[75,161,120,0],[75,161,123,1],[75,161,116,1],[75,161,119,0],[75,160,152,0],[75,160,155,1],[75,160,148,1],[75,160,151,0],[75,160,232,0],[75,160,235,1],[75,160,228,1],[75,160,231,0],[75,175,8,0],[75,175,11,1],[75,175,4,1],[75,175,7,0],[75,175,120,0],[75,175,123,1],[75,175,116,1],[75,175,119,0],[75,174,152,0],[75,174,155,1],[75,174,148,1],[75,174,151,0],[75,174,232,0],[75,174,235,1],[75,174,228,1],[75,174,231,0],[75,147,8,0],[75,147,11,1],[75,147,4,1],[75,147,7,0],[75,147,120,0],[75,147,123,1],[75,147,116,1],[75,147,119,0],[75,146,152,0],[75,146,155,1],[75,146,148,1],[75,146,151,0],[75,146,232,0],[75,146,235,1],[75,146,228,1],[75,146,231,0],[75,157,8,0],[75,157,11,1],[75,157,4,1],[75,157,7,0],[75,157,120,0],[75,157,123,1],[75,157,116,1],[75,157,119,0],[75,156,152,0],[75,156,155,1],[75,156,148,1],[75,156,151,0],[75,156,232,0],[75,156,235,1],[75,156,228,1],[75,156,231,0],[116,33,8,0],[116,33,11,1],[116,33,4,1],[116,33,7,0],[116,33,120,0],[116,33,123,1],[116,33,116,1],[116,33,119,0],[116,32,152,0],[116,32,155,1],[116,32,148,1],[116,32,151,0],[116,32,232,0],[116,32,235,1],[116,32,228,1],[116,32,231,0],[116,47,8,0],[116,47,11,1],[116,47,4,1],[116,47,7,0],[116,47,120,0],[116,47,123,1],[116,47,116,1],[116,47,119,0],[116,46,152,0],[116,46,155,1],[116,46,148,1],[116,46,151,0],[116,46,232,0],[116,46,235,1],[116,46,228,1],[116,46,231,0],[116,19,8,0],[116,19,11,1],[116,19,4,1],[116,19,7,0],[116,19,120,0],[116,19,123,1],[116,19,116,1],[116,19,119,0],[116,18,152,0],[116,18,155,1],[116,18,148,1],[116,18,151,0],[116,18,232,0],[116,18,235,1],[116,18,228,1],[116,18,231,0],[116,29,8,0],[116,29,11,1],[116,29,4,1],[116,29,7,0],[116,29,120,0],[116,29,123,1],[116,29,116,1],[116,29,119,0],[116,28,152,0],[116,28,155,1],[116,28,148,1],[116,28,151,0],[116,28,232,0],[116,28,235,1],[116,28,228,1],[116,28,231,0],[117,225,8,0],[117,225,11,1],[117,225,4,1],[117,225,7,0],[117,225,120,0],[117,225,123,1],[117,225,116,1],[117,225,119,0],[117,224,152,0],[117,224,155,1],[117,224,148,1],[117,224,151,0],[117,224,232,0],[117,224,235,1],[117,224,228,1],[117,224,231,0],[117,239,8,0],[117,239,11,1],[117,239,4,1],[117,239,7,0],[117,239,120,0],[117,239,123,1],[117,239,116,1],[117,239,119,0],[117,238,152,0],[117,238,155,1],[117,238,148,1],[117,238,151,0],[117,238,232,0],[117,238,235,1],[117,238,228,1],[117,238,231,0],[117,211,8,0],[117,211,11,1],[117,211,4,1],[117,211,7,0],[117,211,120,0],[117,211,123,1],[117,211,116,1],[117,211,119,0],[117,210,152,0],[117,210,155,1],[117,210,148,1],[117,210,151,0],[117,210,232,0],[117,210,235,1],[117,210,228,1],[117,210,231,0],[117,221,8,0],[117,221,11,1],[117,221,4,1],[117,221,7,0],[117,221,120,0],[117,221,123,1],[117,221,116,1],[117,221,119,0],[117,220,152,0],[117,220,155,1],[117,220,148,1],[117,220,151,0],[117,220,232,0],[117,220,235,1],[117,220,228,1],[117,220,231,0],[114,97,8,0],[114,97,11,1],[114,97,4,1],[114,97,7,0],[114,97,120,0],[114,97,123,1],[114,97,116,1],[114,97,119,0],[114,96,152,0],[114,96,155,1],[114,96,148,1],[114,96,151,0],[114,96,232,0],[114,96,235,1],[114,96,228,1],[114,96,231,0],[114,111,8,0],[114,111,11,1],[114,111,4,1],[114,111,7,0],[114,111,120,0],[114,111,123,1],[114,111,116,1],[114,111,119,0],[114,110,152,0],[114,110,155,1],[114,110,148,1],[114,110,151,0],[114,110,232,0],[114,110,235,1],[114,110,228,1],[114,110,231,0],[114,83,8,0],[114,83,11,1],[114,83,4,1],[114,83,7,0],[114,83,120,0],[114,83,123,1],[114,83,116,1],[114,83,119,0],[114,82,152,0],[114,82,155,1],[114,82,148,1],[114,82,151,0],[114,82,232,0],[114,82,235,1],[114,82,228,1],[114,82,231,0],[114,93,8,0],[114,93,11,1],[114,93,4,1],[114,93,7,0],[114,93,120,0],[114,93,123,1],[114,93,116,1],[114,93,119,0],[114,92,152,0],[114,92,155,1],[114,92,148,1],[114,92,151,0],[114,92,232,0],[114,92,235,1],[114,92,228,1],[114,92,231,0],[115,161,8,0],[115,161,11,1],[115,161,4,1],[115,161,7,0],[115,161,120,0],[115,161,123,1],[115,161,116,1],[115,161,119,0],[115,160,152,0],[115,160,155,1],[115,160,148,1],[115,160,151,0],[115,160,232,0],[115,160,235,1],[115,160,228,1],[115,160,231,0],[115,175,8,0],[115,175,11,1],[115,175,4,1],[115,175,7,0],[115,175,120,0],[115,175,123,1],[115,175,116,1],[115,175,119,0],[115,174,152,0],[115,174,155,1],[115,174,148,1],[115,174,151,0],[115,174,232,0],[115,174,235,1],[115,174,228,1],[115,174,231,0],[115,147,8,0],[115,147,11,1],[115,147,4,1],[115,147,7,0],[115,147,120,0],[115,147,123,1],[115,147,116,1],[115,147,119,0],[115,146,152,0],[115,146,155,1],[115,146,148,1],[115,146,151,0],[115,146,232,0],[115,146,235,1],[115,146,228,1],[115,146,231,0],[115,157,8,0],[115,157,11,1],[115,157,4,1],[115,157,7,0],[115,157,120,0],[115,157,123,1],[115,157,116,1],[115,157,119,0],[115,156,152,0],[115,156,155,1],[115,156,148,1],[115,156,151,0],[115,156,232,0],[115,156,235,1],[115,156,228,1],[115,156,231,0]]
};