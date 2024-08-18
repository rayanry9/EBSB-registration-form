import type { PageLoad } from './$types';
import type { Event_Data } from '$lib/types';
import { event_data } from '$lib/store/eventData';

const data=event_data;
function findEventData(id: string): Event_Data {
	let event_data: Event_Data = {
		id: id,
		name: data.filter((ev)=>ev.id==id).at(0)!.name,
		time: data.filter((ev)=>ev.id==id).at(0)!.time,
		location: data.filter((ev)=>ev.id==id).at(0)!.location,
		thumbnail_src: data.filter((ev)=>ev.id==id).at(0)?.thumbnail_src,
		description: data.filter((ev)=>ev.id==id).at(0)!.description
	};
	return event_data;
}

export const load: PageLoad = ({ url }) => {
	return findEventData(url.searchParams.get('id')!);
};
