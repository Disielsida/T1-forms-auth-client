import { Button, TextInput } from '@admiral-ds/react-ui';

export const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <TextInput placeholder="Введите текст..." />
      <Button appearance="primary" style={{ marginTop: '12px' }} dimension='m'>
        Отправить
      </Button>
    </div>
  );
};
