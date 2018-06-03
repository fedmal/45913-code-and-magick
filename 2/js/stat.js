'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var shadowSize = 10;

var headerLines = ['Ура вы победили!', 'Список результатов:'];
var LINE_HEIGHT = 20;

var BAR_CHAT_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;

var MARGIN_LEFT = 55;
var MARGIN_VERT = 40;

var getMaxColumnHeight = function () {
  return BAR_CHAT_HEIGHT - LINE_HEIGHT * 2;
};

var getColumnX = function (columnNumber) {
  return CLOUD_X + MARGIN_LEFT + (COLUMN_WIDTH + COLUMN_GAP) * columnNumber;
};

var getColumnY = function (columnHeight) {
  return CLOUD_Y + CLOUD_HEIGHT - MARGIN_VERT - LINE_HEIGHT - columnHeight;
};

var renderCloud = function (ctx, x, y, color, shadow, shadowColor) {
  if (shadow) {
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x + shadow, y + shadow, CLOUD_WIDTH, CLOUD_HEIGHT);
  }
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMultilineText = function (ctx, lines, x, y, nextLine) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + nextLine * i);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var currentColumnHeight;
  var playerColor = 'rgba(255, 0, 0, 1)';
  var getColorSaturation = function (hue, lightness) {
    return 'hsl(' + hue + ', ' + Math.round(Math.random() * 100) + '%, ' + lightness + '%)';
  };

  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff', shadowSize, 'rgba(0, 0, 0, 0.7)');
  renderMultilineText(ctx, headerLines, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + MARGIN_VERT, LINE_HEIGHT);

  for (var i = 0; i < times.length; i++) {
    currentColumnHeight = times[i] * getMaxColumnHeight() / getMaxElement(times);

    ctx.fillStyle = (names[i] === 'Вы') ? playerColor : getColorSaturation(250, 40);
    ctx.fillRect(getColumnX(i), getColumnY(currentColumnHeight), COLUMN_WIDTH, currentColumnHeight);
    renderMultilineText(ctx, [Math.round(times[i]), names[i]], getColumnX(i) + COLUMN_WIDTH / 2, getColumnY(currentColumnHeight) - LINE_HEIGHT, currentColumnHeight + LINE_HEIGHT);
  }
};
