# jquery-bootstrap-filter
A simple portfolio filter for jquery and bootstrap.

Example:

      var json = [{
        title:"Project 1",
        tag:["tag 1"],
        description:"Sample Description",
        image:<image source>,
        link:<link to the project><optional>
      },{
        title:"Project 2",
        tag:["tag 2","tag 1"],
        description:"Sample Description",
        image:<image source>
      },{
        title:"Project 3",
        tag:["tag 3","tag 4"],
        description:"Sample Description",
        image:<image source>
      },{
        title:"Project 4",
        tag:["tag 4","tag 2","tag 1"],
        description:"Sample Description",
        image:<image source>
      }];
      $(<container>).portfolio(json);
