/*jshint esversion: 6 */

/*

Welcome to BeautyJS

JS Module for beautifully varying RGB colour sets
that can be set as backgrounds anywhere!

For usgae, kindly read the instructions in README.md
available at https://github.com/AbhayTr/BeautyJS.

Optional Parameters that are available are listed below
in @params and have to be passed as a JSON object (keys as name of
parameters listed in @params and value is your desired choice
according to the options available for that parameter as
specified in @params) which will be the
first parameter for Beauty().

@params

mode (Optional):

  Specifies colour set in which the colours have to vary.

  Options for mode parameter:
    "dark": Varies the colour in dark colours only (useful for dark mode projects).
    "light": Varies the colour in light colours only (useful for light mode projects).
    [start_rgb, end_rgb]: Varies the colour from start_rgb value (can be from 0 to 255) to end_rgb value (can be from 0 to 255).

  Default Value: "" (i.e. varies from 0 to 255 RGB Values).

start (Optional):

  Specefies colour in RGB format from which colours have to start varying.

  Default Value: [0, 0, 0] (for "dark", none or other mode parameter specified) and [255, 255, 255] (for "light" mode parameter specified).

time (Optional):

  Specifies the time in milliseconds after which the colour is changed according to its range.
  Useful for decreasing the time when using on slow hardware for maintaining the smoothness.

  Default Value: 40 ms (Just perfect for majority hardware types).

So go ahead and enjoy the beauty of time varying RGB colour sets!

© Abhay Tripathi

*/

function Beauty(options = {}, on_new_color)
{
  var mode = "";
  var speed = 40;
  var start_bg_color = [0, 0, 0];
  if (options.speed)
  {
    speed = options.speed;
  }
  if (options.mode)
  {
    mode = options.mode;
  }
  if (options.start)
  {
    start_bg_color = options.start;
  }
  var permissible_range = 100;
  if (mode != "")
  {
    permissible_range = 30;
  }
  var min = 0;
  var max = 255;
  if (mode == "dark")
  {
    max = 140;
  }
  else if (mode == "light")
  {
    min = 140;
  }
  else if (typeof(mode) == "object")
  {
    if (mode.length == 2)
    {
      min = mode[0];
      max = mode[1];
      if (min < 0)
      {
        min = 0;
      }
      if (max > 255)
      {
        max = 255;
      }
    }
  }
  var red = 0;
  var green = 0;
  var blue = 0;
  if (mode == "light")
  {
    red = 255;
    green = 255;
    blue = 255;
  }
  if (start_bg_color[0] != 0 || start_bg_color[1] != 0 || start_bg_color[2] != 0)
  {
    if (start_bg_color[0] < min || start_bg_color[1] < min || start_bg_color[2] < min)
    {
      start_bg_color[0] = min;
      start_bg_color[1] = min;
      start_bg_color[2] = min;
    }
    if (start_bg_color[0] > max || start_bg_color[1] > max || start_bg_color[2] > max)
    {
      start_bg_color[0] = max;
      start_bg_color[1] = max;
      start_bg_color[2] = max;
    }
    red = start_bg_color[0];
    green = start_bg_color[1];
    blue = start_bg_color[2];
  }
  on_new_color([red, green, blue])
  var red_range = 0;
  var green_range = 0;
  var blue_range = 0;
  var terminal_red = 0;
  var terminal_green = 0;
  var terminal_blue = 0;
  
  setInterval
  (
    function()
    {
      if (red_range == 0 && green_range == 0 && blue_range == 0)
      {
        red_range = Math.floor(Math.random() * (permissible_range - (-permissible_range)) ) + (-permissible_range);
        green_range = Math.floor(Math.random() * (permissible_range - (-permissible_range)) ) + (-permissible_range);
        blue_range = Math.floor(Math.random() * (permissible_range - (-permissible_range)) ) + (-permissible_range);
        if (((red + red_range) >= min && (red + red_range) <= max) && ((green + green_range) >= min && (green + green_range) <= max) && ((blue + blue_range) >= min && (blue + blue_range) <= max) && red_range != 0 && green_range != 0 && blue_range != 0)
        {
          terminal_red = red + red_range;
          terminal_green = green + green_range;
          terminal_blue = blue + blue_range;
        }
        else
        {
          red_range = 0;
          green_range = 0;
          blue_range = 0;
        }
      }
      else
      {
        if (red == terminal_red)
        {
          red_range = 0;
        }
        else
        {
          if (red_range < 0)
          {
            red -= 1;
          }
          else
          {
            red += 1;
          }
        }
  
        if (green == terminal_green)
        {
          green_range = 0;
        }
        else
        {
          if (green_range < 0)
          {
            green -= 1;
          }
          else
          {
            green += 1;
          }
        }
  
        if (blue == terminal_blue)
        {
          blue_range = 0;
        }
        else
        {
          if (blue_range < 0)
          {
            blue -= 1;
          }
          else
          {
            blue += 1;
          }
        }
      }
      on_new_color([red, green, blue])
    },
  speed);
}