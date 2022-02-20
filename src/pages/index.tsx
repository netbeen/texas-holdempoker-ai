import styles from './index.less';
import { PageHeader, Space, Button, Divider } from 'antd';
import {useState} from "react";

enum Decision {
  Fold = 'Fold',
  Check = 'Check',
  Call = 'Call',
  Raise = 'Raise 50% Pod',
}

enum Round {
  PreFlop,
  Flop,
  Turn,
  River,
}

const sleep = (timeoutMS: number) => new Promise((resolve) => {
  setTimeout(resolve, timeoutMS);
});

const data = [{
  round: Round.PreFlop,
  description: '前位无加注(除盲注)，本人是大盲',
  decisions: [[Decision.Check, 0.75], [Decision.Raise, 0.25]],
}, {
  round: Round.PreFlop,
  description: '前位无加注(除盲注)，本人不是大盲',
  decisions: [[Decision.Fold, 0.65], [Decision.Check, 0.10], [Decision.Raise, 0.25]],
}, {
  round: Round.PreFlop,
  description: '前位加注',
  decisions: [[Decision.Fold, 0.25], [Decision.Call, 0.65], [Decision.Raise, 0.10]],
}, {
  round: Round.Flop,
  description: '前位无加注',
  decisions: [[Decision.Check, 0.65], [Decision.Raise, 0.35]],
}, {
  round: Round.Flop,
  description: '前位加注',
  decisions: [[Decision.Fold, 0.25], [Decision.Call, 0.65], [Decision.Raise, 0.10]],
}, {
  round: Round.Turn,
  description: '前位无加注',
  decisions: [[Decision.Check, 0.65], [Decision.Raise, 0.35]],
}, {
  round: Round.Turn,
  description: '前位加注',
  decisions: [[Decision.Fold, 0.25], [Decision.Call, 0.65], [Decision.Raise, 0.10]],
}, {
  round: Round.River,
  description: '前位无加注',
  decisions: [[Decision.Check, 0.65], [Decision.Raise, 0.35]],
}, {
  round: Round.River,
  description: '前位加注',
  decisions: [[Decision.Fold, 0.25], [Decision.Call, 0.65], [Decision.Raise, 0.10]],
}]

export default function IndexPage() {
  const [onThinking, setOnThinking] = useState<boolean>(false);
  const [decision, setDecision] = useState<Decision|null>(null);

  const makeDecision = async (input: Array<[Decision, number]>) => {
    setOnThinking(true);
    let previousProbability = 0;
    const formattedInput = input.map((item)=>{
      const result: [Decision, number] = [item[0], previousProbability + item[1]]
      previousProbability += item[1];
      return result;
    });
    await sleep(800);
    const random = Math.random();
    setDecision(formattedInput.find(item => item[1] > random) ? formattedInput.find(item => item[1] > random)[0] : input[0][0]);
    setOnThinking(false);
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Texas Holdem Poker AI"
        subTitle="Win-win means, I will win twice :)"
        extra={[]}
      />
      <div style={{padding: 24}}>
        <Button
          type="primary"
          onClick={()=>{
            setOnThinking(false);
            setDecision(null);
          }}
        >Restart</Button>
        <div>
          <div>Pre-Flop</div>
          <div>
            <Space>
              {data.filter(item => item.round === Round.PreFlop).map(item => (
                <Button
                  type="primary"
                  onClick={()=>{
                    makeDecision(item.decisions)
                  }}
                >{item.description}</Button>
              ))}
            </Space>
          </div>
        </div>
        <div>
          <div>Flop</div>
          <div>
            <Space>
              {data.filter(item => item.round === Round.Flop).map(item => (
                <Button
                  type="primary"
                  onClick={()=>{
                    makeDecision(item.decisions)
                  }}
                >{item.description}</Button>
              ))}
            </Space>
          </div>
        </div>
        <div>
          <div>Turn</div>
          <div>
            <Space>
              {data.filter(item => item.round === Round.Turn).map(item => (
                <Button
                  type="primary"
                  onClick={()=>{
                    makeDecision(item.decisions)
                  }}
                >{item.description}</Button>
              ))}
            </Space>
          </div>
        </div>
        <div>
          <div>River</div>
          <div>
            <Space>
              {data.filter(item => item.round === Round.River).map(item => (
                <Button
                  type="primary"
                  onClick={()=>{
                    makeDecision(item.decisions)
                  }}
                >{item.description}</Button>
              ))}
            </Space>
          </div>
        </div>
        <Divider/>
        {onThinking && <span>I am thinking...</span>}
        {!onThinking && decision && <span>My Decision: {decision}</span>}
      </div>
    </div>
  );
}
