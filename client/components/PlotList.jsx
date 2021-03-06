import React from 'react';

import Plot from './Plot.jsx';
import * as PlotExpActions from '../actions/PlotExpActions.jsx';
import PlotExpStore from '../stores/PlotExpStore.jsx';


class PlotList extends React.Component {
  constructor(props) {
    super(props);

    this.getPlotExps = this.getPlotExps.bind(this);

    this.state = {
      plot_exps: []
    };

  }

  componentWillMount() {
    PlotExpStore.on('change', this.getPlotExps);
    PlotExpActions.reloadPlotExps();
  }

  componentWillUnmount() {
    PlotExpStore.removeListener('change', this.getPlotExps);
  }

  getPlotExps() {
    this.setState({
      plot_exps: PlotExpStore.getAll()
    });
  }

  selectPlot(data) {
    this.props.onPlotSelect(data);
  }
  
  render() {
    const { plot_exps } = this.state;
    const PlotComponents = plot_exps.map((plot_exp) => {
      return <Plot onPlotClick={ this.selectPlot.bind(this) }
                   key={ plot_exp.plot_id }
                   plotId={ plot_exp.plot_id }
                   userId={ plot_exp.user_id }
                   plotExp={ plot_exp.plot_exp }/>
    });

    return (
      <div class="list-group">
        { PlotComponents }
      </div>
    )
  }
}

export default PlotList;
