import React from "react";
import { Row, Col, Statistic } from "antd";

export class TableStatistic extends React.Component {
  state = {
    males: [],
    females: [],
  };

  componentDidMount() {
    let males = [];
    let females = [];

    this.props.data.map(({ gender }) => {
      console.log(gender);
      if (gender === "male") {
        return males.push(gender);
      }
      if (gender === "female") {
        return females.push(gender);
      } else {
        return 0;
      }
    });

    return this.setState({
      males: males.length,
      females: females.length,
    });
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        <Row>
          <Col>
            <Statistic title="Collection size" value={data.length} />
          </Col>
          <Col></Col>
          <Col span={24}></Col>
        </Row>
      </div>
    );
  }
}
