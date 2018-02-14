$(function () {
    //Better to construct options first and then pass it as a parameter
    var options = {
        // title: {
        //     text: "Seleblitysness"
        // },
        animationEnabled: true,
        data: [
            {
                type: "spline", //change it to line, area, column, pie, etc
                dataPoints: [
                    { x: 1, y: 10 },
                    { x: 2, y: 12 },
                    { x: 3, y: 8 },
                    { x: 4, y: 14 },
                    { x: 5, y: 6 },
                    { x: 6, y: 24 },
                    { x: 7, y: -4 },
                    { x: 8, y: 10 }
                ]
            }
        ]
    };

    $("#chartContainer").CanvasJSChart(options);

});
