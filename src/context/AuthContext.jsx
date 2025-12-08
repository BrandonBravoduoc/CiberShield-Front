import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return React.useContext(AuthContext);
}
