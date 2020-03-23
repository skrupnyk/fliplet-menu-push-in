var widgetId = Fliplet.Widget.getDefaultId();
var data = Fliplet.Widget.getData(widgetId) || {};

if (!data.location) {
  $('#menu-location').val('menuRight').trigger('change');
} else {
  $('#menu-location').val('menuLeft').trigger('change');
}

if (!data.hide) {
  $('input[name="hide-menu"][value="no"]').prop('checked', true);
} else {
  $('input[name="hide-menu"][value="yes"]').prop('checked', true);
}

Fliplet.Widget.onSaveRequest(function() {
  var location;
  var hide;
  var menuLocation = $('#menu-location').val();
  var hideMenu = $('input[name="hide-menu"]:checked').val();

  if (menuLocation === 'menuLeft') {
    location = true;
  } else {
    location = false;
  }

  if (hideMenu === 'yes') {
    hide = true;
  } else {
    hide = false;
  }

  Fliplet.Widget.save({
    location: location,
    hide: hide
  }).then(function() {
    Fliplet.Widget.complete();
    Fliplet.Studio.emit('reload-page-preview');
  });
});

Fliplet.Widget.toggleCancelButton(false);

Fliplet.Widget.onCancelRequest(function() {
  Fliplet.Widget.complete();
  Fliplet.Studio.emit('reload-page-preview');
});
