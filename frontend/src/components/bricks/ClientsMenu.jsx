import React from "react";
import "../Main.css";

export default function ClientsMenu() {
    return (
        <div className={"clients_menu"}>
            <p className={"clients client_name"}>
                Ф.И.О
            </p>

            <p className={"clients client_organisation"}>
                Организация
            </p>

            <p className={"clients client_city"}>
                Город
            </p>

            <p className={"clients client_phone"}>
                Телефон
            </p>

            <p className={"clients client_email"}>
                Почта
            </p>

            <p className={"clients client_control"}>
                Контроль
            </p>

            <p className={"clients client_task"}>
                Текущая задача
            </p>

            <p className={"clients client_current_condition"}>
                Текущее состояние
            </p>
        </div>
    )
}