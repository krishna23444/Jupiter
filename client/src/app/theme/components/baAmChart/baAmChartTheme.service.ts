import {Injectable} from '@angular/core';

import {BaThemeConfigProvider} from '../../../theme';


@Injectable()
export class BaAmChartThemeService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getTheme() {
    let layoutColors = this._baConfig.get().colors;

    return {

      themeName: "blur",

      AmChart: {
        color: layoutColors.defaultText,
        backgroundColor: "#364B73"
      },

      AmCoordinateChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark]
      },

      AmStockChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark]
      },

      AmSlicedChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark],
        labelTickColor: "#364B73",
        labelTickAlpha: 0.3
      },

      AmRectangularChart: {
        zoomOutButtonColor: '#364B73',
        zoomOutButtonRollOverAlpha: 0.15,
        zoomOutButtonImage: "lens.png"
      },

      AxisBase: {
        axisColor: "#364B73",
        axisAlpha: 0.3,
        gridAlpha: 0.1,
        gridColor: "#364B73"
      },

      ChartScrollbar: {
        backgroundColor: "#364B73",
        backgroundAlpha: 0.12,
        graphFillAlpha: 0.5,
        graphLineAlpha: 0,
        selectedBackgroundColor: "#364B73",
        selectedBackgroundAlpha: 0.4,
        gridAlpha: 0.15
      },

      ChartCursor: {
        cursorColor: layoutColors.primary,
        color: "#364B73",
        cursorAlpha: 0.5
      },

      AmLegend: {
        color: "#364B73"
      },

      AmGraph: {
        lineAlpha: 0.9
      },
      GaugeArrow: {
        color: "#364B73",
        alpha: 0.8,
        nailAlpha: 0,
        innerRadius: "40%",
        nailRadius: 15,
        startWidth: 15,
        borderAlpha: 0.8,
        nailBorderAlpha: 0
      },

      GaugeAxis: {
        tickColor: "#364B73",
        tickAlpha: 1,
        tickLength: 15,
        minorTickLength: 8,
        axisThickness: 3,
        axisColor: '#364B73',
        axisAlpha: 1,
        bandAlpha: 0.8
      },

      TrendLine: {
        lineColor: layoutColors.danger,
        lineAlpha: 0.8
      },

      // ammap
      AreasSettings: {
        alpha: 0.8,
        color: layoutColors.info,
        colorSolid: layoutColors.primaryDark,
        unlistedAreasAlpha: 0.4,
        unlistedAreasColor: "#364B73",
        outlineColor: "#364B73",
        outlineAlpha: 0.5,
        outlineThickness: 0.5,
        rollOverColor: layoutColors.primary,
        rollOverOutlineColor: "#364B73",
        selectedOutlineColor: "#364B73",
        selectedColor: "#f15135",
        unlistedAreasOutlineColor: "#364B73",
        unlistedAreasOutlineAlpha: 0.5
      },

      LinesSettings: {
        color: "#364B73",
        alpha: 0.8
      },

      ImagesSettings: {
        alpha: 0.8,
        labelColor: "#364B73",
        color: "#364B73",
        labelRollOverColor: layoutColors.primaryDark
      },

      ZoomControl: {
        buttonFillAlpha: 0.8,
        buttonIconColor: layoutColors.default,
        buttonRollOverColor: layoutColors.danger,
        buttonFillColor: layoutColors.primaryDark,
        buttonBorderColor: layoutColors.primaryDark,
        buttonBorderAlpha: 0,
        buttonCornerRadius: 0,
        gridColor: "#364B73",
        gridBackgroundColor: "#364B73",
        buttonIconAlpha: 0.6,
        gridAlpha: 0.6,
        buttonSize: 20
      },

      SmallMap: {
        mapColor: "#000000",
        rectangleColor: layoutColors.danger,
        backgroundColor: "#364B73",
        backgroundAlpha: 0.7,
        borderThickness: 1,
        borderAlpha: 0.8
      },

      // the defaults below are set using CSS syntax, you can use any existing css property
      // if you don't use Stock chart, you can delete lines below
      PeriodSelector: {
        color: "#364B73"
      },

      PeriodButton: {
        color: "#364B73",
        background: "transparent",
        opacity: 0.7,
        border: "1px solid rgba(0, 0, 0, .3)",
        MozBorderRadius: "5px",
        borderRadius: "5px",
        margin: "1px",
        outline: "none",
        boxSizing: "border-box"
      },

      PeriodButtonSelected: {
        color: "#364B73",
        backgroundColor: "#b9cdf5",
        border: "1px solid rgba(0, 0, 0, .3)",
        MozBorderRadius: "5px",
        borderRadius: "5px",
        margin: "1px",
        outline: "none",
        opacity: 1,
        boxSizing: "border-box"
      },

      PeriodInputField: {
        color: "#364B73",
        background: "transparent",
        border: "1px solid rgba(0, 0, 0, .3)",
        outline: "none"
      },

      DataSetSelector: {
        color: "#364B73",
        selectedBackgroundColor: "#b9cdf5",
        rollOverBackgroundColor: "#a8b0e4"
      },

      DataSetCompareList: {
        color: "#364B73",
        lineHeight: "100%",
        boxSizing: "initial",
        webkitBoxSizing: "initial",
        border: "1px solid rgba(0, 0, 0, .3)"
      },

      DataSetSelect: {
        border: "1px solid rgba(0, 0, 0, .3)",
        outline: "none"
      }
    };
  }

}
