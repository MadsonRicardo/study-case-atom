import React, { useState, useEffect } from 'react';
import TaskManager from '../TaskManager/TaskManager';

function Dashboard() {

    return (
        <div className='container'>
            <h1>Bem-vindo ao Atomo!</h1>
            <TaskManager />
        </div>
    );
}

export default Dashboard;