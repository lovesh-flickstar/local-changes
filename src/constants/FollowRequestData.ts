interface FollowRequest {
    id: string;
    avatar?: string;
    username: string;
    fullName: string;
  }

export const mockFollowRequests: FollowRequest[] = [
    { id: '1', username: 'James_Jevis', fullName: 'James Levis' },
    { id: '2', username: 'sara_k99', fullName: 'Sara Khan' },
    { id: '3', username: 'coder123', fullName: 'Alex Carter' },
    { id: '4', username: 'artsy_ava', fullName: 'Ava Thompson' },
    { id: '5', username: 'theRealTom', fullName: 'Tom Reynolds' },
    { id: '6', username: 'emily_reads', fullName: 'Emily Walker' },
  ];
  