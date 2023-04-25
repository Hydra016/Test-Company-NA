import { DynamicList } from "./DynamicList";
import { RDM_Device } from "./RDM_Device";
import { Server } from "./Server";

window.onload = () => {
  main();
};

var g_Server: Server;
var g_DeviceList: DynamicList;
const table = document.querySelector("#root");
let devices: RDM_Device[] = [];
let filteredDevices: RDM_Device[] = [];
let activeDevices: any = 0;
let filterMode = document.querySelector('#filterMode')
let sortMode = document.querySelector('#sortMode')

function generateTable(device: RDM_Device) {
  activeDevices = g_Server.GetDeviceCount();
  let activeDevicesText = document.querySelector("#activeDevices");
  activeDevices
    ? (activeDevicesText.innerHTML = String(activeDevices))
    : (activeDevicesText.textContent = "0");
  document.querySelector("#filter").textContent = String(
    filteredDevices.length
  );
  return `      <tr class="rdm-list-header na-table-header">
    <td></td>
    <td class="uid">${device.uid}</td>
    <td class="label">${device.label}</td>
    <td class="manufacturer">${device.manufacturer}</td>
    <td class="model">${device.model}</td>
    <td class="mode">${device.mode_index}</td>
    <td class="address">${device.address}</td>
</tr>`;
}

function filterByName(name: string) {
  filteredDevices = devices.filter((device) => device.manufacturer === name);
  table.innerHTML = `
      ${filteredDevices
        .map((device: RDM_Device) => generateTable(device))
        .join("")}
                  `;
}

function showResults(numResults: number) {
  const incrementResultsToShow = 100;
  table.innerHTML = `
        ${devices
          .slice(0, numResults)
          .map((device) => generateTable(device))
          .join("")}
        <tr class="show-more-row">
            <td colspan="7" class="show-more-cell">
                <button class="show-more-button" ${
                  numResults >= devices.length ? 'style="display:none;"' : ""
                }>Show More</button>
            </td>
        </tr>
    `;

  const showMoreButton = document.querySelector(".show-more-button");
  if (showMoreButton) {
    showMoreButton.addEventListener("click", () => {
      const numResultsToShow = Math.min(
        devices.length,
        numResults + incrementResultsToShow
      );
      showResults(numResultsToShow);
    });
  }
}

const sortDevices = (devices: RDM_Device[], key: string): void => {
  const newDevices = devices.sort((a:any, b:any) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });

  table.innerHTML = `
    ${newDevices
      .map((device: RDM_Device) => generateTable(device))
      .join("")}`;
};



function main() {
  g_Server = new Server({
    device_added_callback: (device_data: RDM_Device) => {
      devices = [...devices, device_data];

      const maxResultsToShow = 50;

      if (devices.length <= maxResultsToShow) {
        showResults(devices.length);
      } else {
        showResults(maxResultsToShow);
      }
    },

    device_updated_callback(device_data: RDM_Device) {
      const index = devices.findIndex(
        (device) => device.uid === device_data.uid
      );

      if (index !== -1) {
        devices[index] = { ...devices[index], ...device_data };
        const tableRow = document.querySelector(
          `.na-table tr:nth-child(${index + 2})`
        ) as HTMLElement;

        if (tableRow) {
          tableRow.innerHTML = `
              <td></td>
              <td class="uid">${devices[index].uid}</td>
              <td class="label">${devices[index].label}</td>
              <td class="manufacturer">${devices[index].manufacturer}</td>
              <td class="model">${devices[index].model}</td>
              <td class="mode">${devices[index].mode_index}</td>
              <td class="address">${devices[index].address}</td>
          `;
        }
      }

      const maxResultsToShow = 20;
      if (devices.length <= maxResultsToShow) {
        showResults(devices.length);
      } else {
        showResults(maxResultsToShow);
      }
    },
  });

  // Use Server.GetDeviceCount() to get number of devices in backend device list
  // Use Server.GetDeviceByIndex() to get backend device by index (index 0 - first added device, index 2 - third added device, ...)
  console.log("First Device: ", g_Server.GetDeviceByIndex(0));

  document.getElementById("filter_none").onclick = () => {
    filterMode.textContent = 'None'
    const table = document.querySelector("#root");
    filteredDevices = [];
    table.innerHTML = ""; // Clear previous list
    table.innerHTML = `
      ${devices.map((device: RDM_Device) => generateTable(device)).join("")}
                  `;
  };

  document.getElementById("filter_na").onclick = () => {
    filterMode.textContent = 'NA'
    filterByName("Company NA");
  };

  document.getElementById("filter_tmb").onclick = () => {
    filterMode.textContent = 'TMB'
    filterByName("TMB");
  };

  document.getElementById("sort_uid").onclick = () => {
    sortMode.textContent = 'UID'
    filterMode.textContent !== 'None' ? sortDevices(filteredDevices, 'uid') : sortDevices(devices, 'uid')
  };

  document.getElementById("sort_address").onclick = () => { 
    sortMode.textContent = 'Address'
    filterMode.textContent !== 'None' ? sortDevices(filteredDevices, 'address') : sortDevices(devices, 'address')
  };

  document.getElementById("sort_manufacturer").onclick = () => {
    sortMode.textContent = 'Manufacturer'
    filterMode.textContent !== 'None' ? sortDevices(filteredDevices, 'manufacturer') : sortDevices(devices, 'manufacturer')
  };

  g_DeviceList = new DynamicList(document.getElementById("rdm_device_list"));
}
