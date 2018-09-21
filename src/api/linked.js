import sync from './sync';

/**
 * Link brush activity between user specified charts and grid, if it exists
 *
 * @param {Object} chartIDs - specify array of chart indices which should be linked.
 * For example, chartIDs = [0,1] would link the first two charts.
 */

const linked = (config, ps, flags) =>
  function(chartIDs = []) {
    if (chartIDs.length == 0) {
      chartIDs = Object.keys(config.partition);
    }
    // force numeric type for indexing
    chartIDs = chartIDs.map(Number);

    // setup linked components
    chartIDs.forEach(i => {
      config.linked[i] = ps.charts[i];
    });

    ps.charts.forEach((pc, i) => {
      if (chartIDs.includes(i)) {
        pc.on('brush', sync(config, ps, flags));
      }
    });

    // connect grid
    // highlight row in charts
    // config.grid.onMouseEnter.subscribe( (e, args) => {
    //   const i = grid.getCellFromEvent(e).row;
    //   const d = config.brushed || config.data;
    //   ps.charts.forEach( pc => {
    //     pc.highlight([d[i]]);
    //   })
    // });
    // config.grid.onMouseLeave.subscribe( (e, args) => {
    //   ps.charts.forEach( (pc) => {
    //     pc.unhighlight();
    //   })
    // });

    // mark / unmark rows in charts
    // config.grid.onSelectedRowsChanged.subscribe( (e, args) => {
    //   const selected_row_ids = config.grid.getSelectedRows();
    //   if (config.brushed) {
    //     // nothing outside of brushed should be markable
    //     const d = config.brushed;
    //   } else {
    //     const d = config.data;
    //   }
    //   ps.charts.forEach( (pc) => {
    //     pc.unmark();
    //     pc.mark(selected_row_ids); //NOTE: this may not work initially
    //   })
    // });

    return this;
  };

export default linked;
