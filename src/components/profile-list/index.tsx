import React, { useEffect, useState } from 'react';
import { IProfile } from '../../models';
import { getAllProfiles } from '../../services/profiles-service';
import { Pagination } from '../pagination';
import ProfileCard from '../profile-card';
import './index.css';

const limit = 6;

function ProfilesList() {
	let [profiles, setProfiles] = useState([]);
	let [pages, setPages] = useState(0);
	let [curentPage, setCurrentPage] = useState(1);
	let [filteredProfiles, setFilteredProfiles] = useState([]);
	let [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const fetch = async () => {
			const allProfiles = await getAllProfiles();

			setProfiles(allProfiles as any);
			const window = curentPage * limit - limit;
			const filtered = allProfiles.slice(window, window + limit);
			setFilteredProfiles(filtered as any);
			const pages = allProfiles.length / limit + 1;
			setPages(pages);
		};
		fetch();
	}, []);

	const onButtonClick = (page: number) => {
		setCurrentPage(page);
		const window = page * limit - limit;

		const filtered = profiles.slice(window, window + limit);
		setFilteredProfiles(filtered as any);
	};

	return (
		<div>
			<div className='search-bar-contianer'>
				<div className='search'>
					<input
						className='search-term'
						type='search'
						placeholder='Search a profile...'
						onChange={(event) => {
							setSearchValue(event.target.value);
							const value = event.target.value.toLowerCase();
							const filtered = profiles.filter(
								(profile: IProfile) =>
									profile.first_name
										.toLowerCase()
										.includes(value) ||
									profile.last_name
										.toLowerCase()
										.includes(value) ||
									profile.job_title
										.toLowerCase()
										.includes(value)
							);
							const pages = filtered.length / limit + 1;

							setPages(pages);
							setCurrentPage(1);
							setFilteredProfiles(
								filtered.slice(
									curentPage * limit - limit,
									limit
								)
							);
						}}
					></input>
					<button className='search-button' title='search'>
						Search
					</button>
				</div>
			</div>
			{filteredProfiles.length > 0 && (
				<div>
					<div className='profile-wrapper'>
						<div className='profile-container'>
							{filteredProfiles.map((profile) => (
								<ProfileCard profile={profile} />
							))}
						</div>
					</div>
					<div>
						<Pagination
							size={pages}
							handler={onButtonClick}
							selected={curentPage}
						></Pagination>
					</div>
				</div>
			)}
			{filteredProfiles.length === 0 && (
				<div className='flex-container' style={{ height: '100%' }}>
					No results found for "{searchValue}"
				</div>
			)}
		</div>
	);
}

export default ProfilesList;

