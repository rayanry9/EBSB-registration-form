import type { PageLoad } from './$types';
import type { Event_Data } from '$lib/types';

function findEventData(id: string): Event_Data {
	let event_data: Event_Data = {
		id: id,
		name: 'Event Name',
		time: 'XX:XX AP to XX::XX PA',
		location: 'Location',
		thumbnail_src: '/src/lib/images/placeholder.webp',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan nunc risus, bibendum vulputate justo interdum et. Praesent ut mi lectus. Integer eleifend quis magna in dapibus. Maecenas scelerisque enim eu quam sollicitudin, euismod tristique justo accumsan. Vivamus auctor lectus vel tellus maximus ultrices. Fusce posuere risus id arcu lobortis tincidunt nec et augue. Duis purus dolor, lobortis eget efficitur.'
	};
	return event_data;
}

export const load: PageLoad = ({ url }) => {
	return findEventData(url.searchParams.get('id')!);
};
