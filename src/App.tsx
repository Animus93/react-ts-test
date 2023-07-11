import { Component } from "react";

// Интерфейсы
interface Param {
  id: number;
  name: string;
  type?: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

type State = Model;
type Color = String;

// классовый компонент
class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: props.model.paramValues || [],
    };
  }
  //получаем paramId из props.params
  handleParamChange = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const foundParam = paramValues.find((pv) => pv.paramId === paramId);
    // если в стейте есть такйо id переписываем значение
    if (foundParam) {
      foundParam.value = value;
      this.setState({ paramValues: [...paramValues] });
      // если в стейте нет такйо id добавлям его и значение из инпута
    } else {
      this.setState({
        paramValues: [...paramValues, { paramId, value }],
      });
    }
  };
  //возвращаяет все данные из стейта
  getModel = () => {
    console.log(this.state.paramValues);
    return { paramValues: this.state.paramValues };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param: Param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              // если paramId не существует в стейте выводит пустую строку
              value={
                paramValues.find((pv) => pv.paramId === param.id)?.value || ""
              }
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={this.getModel}>getModel</button>
      </div>
    );
  }
}

function App() {
  const myParams = [
    {
      id: 1,
      name: "Назначение",
    },
    {
      id: 2,
      name: "Длина",
    },
  ];

  const myModel = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
    ],
  };

  return (
    <>
      <ParamEditor params={myParams} model={myModel} />
    </>
  );
}

export default App;
