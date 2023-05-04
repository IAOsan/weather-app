import Clock from './Clock.component';
import Toggler from './common/Toggler.component';
import { GithubIcon } from '../icons';

function Header() {
	return (
		<header className='header flex flex-jc-sb mb-40'>
			<Clock />
			<div className='header__buttons flex flex-ai-c'>
				<Toggler
					label={{
						on: () => <b>°C</b>,
						off: () => <b>°F</b>,
					}}
					onChange={() => {}}
				/>
				<a
					href='/github' //FIXME
					target='_blank'
					rel='noreferrer noopener'
					className='source d-block'
				>
					<span className='icon icon--source'>
						<GithubIcon />
					</span>
					<span className='sr-only'>View source code on github</span>
				</a>
			</div>
		</header>
	);
}

export default Header;
