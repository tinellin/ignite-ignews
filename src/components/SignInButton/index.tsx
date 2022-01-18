import { useSession, signIn, signOut } from 'next-auth/react';
import { FaGithub as GithubIcon } from 'react-icons/fa';
import { FiX as CloseIcon } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={!session ? () => signIn('github') : () => signOut()}
    >
      <GithubIcon color={session ? '04d361' : 'eba417'} />
      {session ? session.user.name : 'Sign in with Github'}
      {session && <CloseIcon className={styles.closeIcon} />}
    </button>
  );
}
