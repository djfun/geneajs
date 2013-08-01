var myTree = {
  pedigree: {
    data: {
      name: "Me",
      gender: "male",
      birth: "xx.xx.xxxx"
    },
    spouses: [
      {
        data: {
          name: "S1",
          gender: "female",
          birth: "xx.xx.xxxx"
        },
        children: [
          {
            data: {
              name: "Child 1",
              gender: "male",
              birth: "xx.xx.xxxx"
            }
          },
          {
            data: {
              name: "Child 2",
              gender: "male",
              birth: "xx.xx.xxxx"
            }
          }
        ]
      }
    ]
  },
  siblings1: [
    {
      data: {
        name: "Brother 1",
        gender: "male",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "Brother 1s spouse",
            gender: "female",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "Brother 1s daughter 1",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "Brother 2",
        gender: "male",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "S2",
            gender: "female",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "Brother 2s daughter 1",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Brother 2s daughter 2",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Brother 2s son",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        }
      ]
    }
  ],
  mother_siblings: [
    {
      data: {
        name: "1 Aunt 1",
        gender: "female",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "S3",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "1 Aunt 1s son 1",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "1 Aunt 1s son 2",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "1 Aunt 2",
        gender: "female",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "S4",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "1 Aunt 2s son 1",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "1 Aunt 2s son 2",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "1 Aunt 2s son 3",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        },
        {
          data: {
            name: "S4a",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "a1 Aunt 2s son 1",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s son 2",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s son 3",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        },
        {
          data: {
            name: "S4b",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "b1 Aunt 2s son 1",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        },
        {
          data: {
            name: "S4c",
            gender: "male",
            birth: "xx.xx.xxxx"
          }
        }
      ]
    },
    /*{
      data: {
        name: "Aunt 1",
        gender: "female",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "S5",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "Aunt 1s son 1",
                gender: "male",
                birth: "xx.xx.xxxx"
              },
              spouses: [
                {
                  data: {
                    name: "S6",
                    gender: "female",
                    birth: "xx.xx.xxxx"
                  },
                  children: [
                    {
                      data: {
                        name: "Aunt 1s son 1s son",
                        gender: "male",
                        birth: "xx.xx.xxxx"
                      },
                      spouses: [
                        {
                          data: {
                            name: "Aunt 1s son 1s sons spouse",
                            gender: "female",
                            birth: "xx.xx.xxxx"
                          },
                          children: [
                            {
                              data: {
                                name: "Aunt 1s son 1s sons son",
                                gender: "male",
                                birth: "xx.xx.xxxx"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              data: {
                name: "Aunt 1s son 2",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        }
      ]
    }*/
  ],
  father_siblings: [
    {
      data: {
        name: "Aunt 0",
        gender: "female",
        birth: "xx.xx.xxxx"
      }
    },
    {
      data: {
        name: "Aunt 1",
        gender: "female",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "S5",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "Aunt 1s son 1",
                gender: "male",
                birth: "xx.xx.xxxx"
              },
              spouses: [
                {
                  data: {
                    name: "S6",
                    gender: "female",
                    birth: "xx.xx.xxxx"
                  },
                  children: [
                    {
                      data: {
                        name: "Aunt 1s son 1s son",
                        gender: "male",
                        birth: "xx.xx.xxxx"
                      },
                      spouses: [
                        {
                          data: {
                            name: "Aunt 1s son 1s sons spouse",
                            gender: "female",
                            birth: "xx.xx.xxxx"
                          },
                          children: [
                            {
                              data: {
                                name: "Aunt 1s son 1s sons son",
                                gender: "male",
                                birth: "xx.xx.xxxx"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              data: {
                name: "Aunt 1s son 2",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "Aunt 2",
        gender: "female",
        birth: "xx.xx.xxxx"
      },
      spouses: [
        {
          data: {
            name: "S7",
            gender: "male",
            birth: "xx.xx.xxxx"
          },
          children: [
            {
              data: {
                name: "Aunt 2s son",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Aunt 2s son",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Aunt 2s son",
                gender: "male",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            },
            {
              data: {
                name: "Aunt 2s daughter",
                gender: "female",
                birth: "xx.xx.xxxx"
              }
            }
          ]
        }
      ]
    }
  ],
  father: {
    data: {
      name: "Father",
      gender: "male",
      birth: "xx.xx.xxxx"
    }
  },
  mother: {
    data: {
      name: "Mother",
      gender: "female",
      birth: "xx.xx.xxxx"
    },
    father: {
      data: {
        name: "Grandfather",
        gender: "male",
        birth: "xx.xx.xxxx"
      },
      father: {
        data: {
          name: "Great-grandfather",
          gender: "male",
          birth: "xx.xx.xxxx",
          death: "yy.yy.yyyy"
        }
      },
      mother: {
        data: {
          name: "Great-grandmother",
          gender: "female",
          birth: "xx.xx.xxxx",
          death: "yy.yy.yyyy"
        }
      }
    },
    mother: {
      data: {
        name: "Grandmother",
        gender: "female",
        birth: "xx.xx.xxxx"
      },
      father: {
        data: {
          name: "Great-grandfather",
          gender: "male",
          birth: "xx.xx.xxxx",
          death: "yy.yy.yyyy"
        }
      },
      mother: {
        data: {
          name: "Great-grandmother",
          gender: "female",
          birth: "xx.xx.xxxx",
          death: "yy.yy.yyyy"
        }
      }
    }
  }
};