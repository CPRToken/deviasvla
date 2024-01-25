import { useContext } from 'react';

import type { AuthContextType as FirebaseAuthContextType } from 'src/contexts/auth/firebase';
import { AuthContext } from 'src/contexts/auth/firebase';


type AuthContextType = FirebaseAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
