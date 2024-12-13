import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { App } from './app/App';
import './shared/config/i18n/i18n';
import './app/styles/index.scss';
import './index.css';
import defaultTheme from 'antd/lib/theme';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

dayjs.locale('ru');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ConfigProvider
                    theme={{
                        token: {
                            ...defaultTheme,
                            colorSplit: 'transparent',
                            colorPrimary: '#454cee',
                        },

                        components: {
                            Menu: {
                                // colorItemBgHover: 'red',
                                itemSelectedBg: '#...',
                                itemSelectedColor: '#454cee',
                                itemColor: '#646d8b',
                            },
                        },
                    }}
                >
                    <ThemeProvider>
                        {/*<h1>{dayjs("2024-05-29T11:19:14.174Z").fromNow()}</h1>*/}
                        <App />
                    </ThemeProvider>
                </ConfigProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
);
