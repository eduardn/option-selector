import logo from './logo.svg';
import './App.css';

import { OptionSelector, Item } from './option-selector/OptionSelector';

function App() {
  const IDP_CARDS = [
    {
      id: 'azure',
      title: 'Azure'
    },
    {
      id: 'google',
      title: 'Google'
    },
    {
      id: 'saml',
      title: 'SAML'
    }
  ];

  const onSelectionChange = (item) => {
    console.log('>>>>>> SELECTED', item);
  }

  return (
    <div className="App">
      <OptionSelector
        onSelectionChange={onSelectionChange}
        items={IDP_CARDS}
        selectionMode="single"
        disabledKeys={['google']}
        defaultSelectedKeys={['azure']}
      >
        {idpCard => <Item key={idpCard.id}><div className="card">{idpCard.title}</div></Item>}
      </OptionSelector>
    </div>
  );
}

export default App;
