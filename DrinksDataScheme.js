////// drinks data structure  /////

drinks<Object> = {
  data<NormalizedMap>:{
    drinkID<String>:{name, id, url}
    drinkID<String>:{name, id, url}
    ...
  },
  queries<NormalizedMap>:{
    query<String>:{
      indexies<List>:[drinkId1, drinkId2 ...],
      totalRec<Number>
    }
    ...
  }
}
