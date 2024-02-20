export interface TopLevelData {
    name: string;
    age: number;
    secondLevelData: SecondLevelData[];
}

export interface SecondLevelData {
    name: string;
    age: number;
    thirdLevelData: ThirdLevelData[];
}

export interface ThirdLevelData {
    name: string;
    age: number;
}

export const TOP_LEVEL_DATA: TopLevelData[] = [
    {
        name: 'Level 1 - 1',
        age: 44,
        secondLevelData: [
            {
                name: 'Level 2 - 1',
                age: 22,
                thirdLevelData: [
                    { name: 'Level 3 - 1', age: 22 },
                    { name: 'Level 3 - 2', age: 33  },
                    { name: 'Level 3 - 3', age: 44  }
                ]
            },
            {
                name: 'Level 2 - 2',
                age: 23,
                thirdLevelData: [
                    { name: 'Level 3 - 4', age: 33  },
                    { name: 'Level 3 - 5', age: 44  },
                    { name: 'Level 3 - 6', age: 55  }
                ]
            }
        ]
    },
    {
        name: 'Level 1 - 2',
        age: 55,
        secondLevelData: [
            {
                name: 'Level 2 - 3', age: 66,
                thirdLevelData: [
                    { name: 'Level 3 - 7', age: 22  },
                    { name: 'Level 3 - 8', age: 11  },
                    { name: 'Level 3 - 9', age: 54  }
                ]
            },
            {
                name: 'Level 2 - 4', age: 22,
                thirdLevelData: [
                    { name: 'Level 3 - 10', age: 22  },
                    { name: 'Level 3 - 11', age: 22  },
                    { name: 'Level 3 - 12' , age: 22 }
                ]
            }
        ]
    }
];