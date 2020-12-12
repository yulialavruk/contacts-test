import { useEffect, useState } from "react";
import { Row, Col, Space, Statistic } from "antd";
import { NATIONALITIES } from "../../../constants/nationalities";
import { Typography } from "antd";

const { Title, Text } = Typography;

const countryList = [];
for (let key in NATIONALITIES) {
  countryList.push(<div key={key}>{NATIONALITIES[key].name}</div>);
}

export const ContactsStatistic = ({ data }) => {
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);
  const [indeterminate, setIndeterminate] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    let males = [];
    let females = [];
    let indeterminate = [];
    data.map(({ gender }) => {
      if (gender === "male") {
        return males.push(gender);
      }
      if (gender === "female") {
        return females.push(gender);
      }
      if (gender === "indeterminate") {
        return indeterminate.push(gender);
      } else {
        return 0;
      }
    });
    setMales(males.length);
    setFemales(females.length);
    setIndeterminate(indeterminate.length);
  }, [data]);

  useEffect(() => {
    const nationalities = data.reduce((a, { nat }) => {
      const natKey = NATIONALITIES[nat].name || NATIONALITIES.UNKNOWN.name;
      return a[natKey] ? (a[natKey]++, a) : ((a[natKey] = 1), a);
    }, {});

    setNationalities(nationalities);
  }, [data]);

  const keys = Object.keys(nationalities).sort();

  return (
    <div className="box">
      <div className="box__content">
        <Title level={3}>Statistic</Title>
        <Row>
          <Col className="col-padding">
            <Statistic title="Collection size" value={data.length} />
          </Col>
          <Col className="col-padding" flex="auto">
            <Space>
              <Statistic title="Males" value={males} />
              <Statistic title="Females" value={females} />
              <Statistic title="Indeterminate" value={indeterminate} />
            </Space>
            <div>
              <Text mark>
                {(() => {
                  if (males > females) {
                    return "Mens predominate";
                  }

                  if (males < females) {
                    return "Women predominate";
                  }

                  if (males === females) {
                    return "iqual";
                  }

                  return null;
                })()}
              </Text>
            </div>
          </Col>
          <Col span={24} className="statistic-nat">
            <Statistic
              title="Nationalities"
              formatter={() => (
                <div className="statistic-nat__wrap">
                  {keys.map((key, index) => {
                    return (
                      <div className="statistic-nat__item" key={index}>
                        <span className="text-bold">{key}:</span>{" "}
                        {nationalities[key]} contacts
                      </div>
                    );
                  })}
                </div>
              )}
            ></Statistic>
          </Col>
        </Row>
      </div>
    </div>
  );
};
