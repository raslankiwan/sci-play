import React from 'react';
import './styles.css';

function ProfileCard(props: any) {
	const {profile } = props;

	return (
		<div
			className='container'
			key={profile.first_name + props.profile.last_name}
		>
			<img src={props.profile.profile_image} />
			<div className='fullname'>
				{props.profile.first_name} {props.profile.last_name}
			</div>
			<div className='job-title'>{props.profile.job_title}</div>
		</div>
	);
}

export default ProfileCard;

