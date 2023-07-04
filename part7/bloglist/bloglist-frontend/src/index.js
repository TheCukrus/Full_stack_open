import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import { NotificationContexProvider } from "./components/NotificationContext.js"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationContexProvider>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NotificationContexProvider>
)