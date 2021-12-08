import { FaGithub as GithubIcon } from 'react-icons/fa';
import { FiX as CloseIcon } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggedIn = false;

  return (
    <button type="button" className={styles.signInButton}>
      <GithubIcon color={isUserLoggedIn ? '04d361' : 'eba417'} />
      {isUserLoggedIn ? 'Enzo Tinelli' : 'Sign in with Github'}
      {isUserLoggedIn && <CloseIcon className={styles.closeIcon} />}
    </button>
  );
}
